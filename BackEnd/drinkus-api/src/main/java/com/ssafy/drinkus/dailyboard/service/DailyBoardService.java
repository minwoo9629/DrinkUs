package com.ssafy.drinkus.dailyboard.service;

import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.InvalidException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.dailyboard.DailyBoard;
import com.ssafy.drinkus.dailyboard.DailyBoardRepository;
import com.ssafy.drinkus.dailyboard.query.DailyBoardQueryRepository;
import com.ssafy.drinkus.dailyboard.request.DailyBoardCreateRequest;
import com.ssafy.drinkus.dailyboard.request.DailyBoardUpdateRequest;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import com.ssafy.drinkus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DailyBoardService {

    private final DailyBoardRepository dailyBoardRepository;
    private final UserService userService;
    private final DailyBoardQueryRepository dailyBoardQueryRepository;

    // 원글 조회

    // 댓글 조회

    // 원글 작성
    @Transactional
    public void createDailyBoard(Long userId, DailyBoardCreateRequest request) {
        User user = userService.findById(userId);
        DailyBoard dailyBoard = DailyBoard.createDailyBoard(user, user, request.getBoardContent());
        dailyBoardRepository.save(dailyBoard);
    }

    // 댓글 작성
    @Transactional
    public void createComment(Long userId, DailyBoardCreateRequest request, Long parentId) {
        User user = userService.findById(userId);

        DailyBoard parentBoard = dailyBoardRepository.findByBoardId(parentId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_DAILY_NOT_FOUND));
        if (parentBoard.getParentId() != null) {
            throw new InvalidException("답글에는 답글을 작성할 수 없습니다.");
        }

        DailyBoard dailyBoard = DailyBoard.createDailyBoard(user, user, request.getBoardContent(), parentId);
        dailyBoardRepository.save(dailyBoard);
    }

    // 글 수정
    @Transactional
    public void updateDailyBoard(Long userId, DailyBoardUpdateRequest request, Long boardId) {
        User user = userService.findById(userId);

        DailyBoard dailyBoard = dailyBoardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_DAILY_NOT_FOUND));

        if (user.getUserRole() != UserRole.ROLE_ADMIN && !user.equals(dailyBoard.getCreater())) {
            // 원글 작성자이거나 관리자 권한일 때만 수정 가능
            throw new AuthenticationException("본인이 쓴 글만 수정 할 수 있습니다.");
        }

        dailyBoard.updateDailyBoard(user, request.getBoardContent());
    }

    // 글 삭제
    @Transactional
    public void deleteDailyBoard(Long userId, Long boardId) {
        User user = userService.findById(userId);

        DailyBoard dailyBoard = dailyBoardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_DAILY_NOT_FOUND));

        if (user.getUserRole() != UserRole.ROLE_ADMIN && !user.equals(dailyBoard.getCreater())) {
            // 원글 작성자이거나 관리자 권한일 때만 삭제 가능
            throw new AuthenticationException("본인이 쓴 글만 삭제 할 수 있습니다.");
        }

        if (dailyBoard.getParentId() == null) {
            // 부모 Id가 없음 = 원게시물
            dailyBoardRepository.delete(dailyBoard); // 글 삭제 시 글에 대한 답글들도 모두 삭제
        }

        dailyBoardQueryRepository.deleteAllReplies(dailyBoard.getBoardId()); // 해당 게시물 삭제
    }
}
