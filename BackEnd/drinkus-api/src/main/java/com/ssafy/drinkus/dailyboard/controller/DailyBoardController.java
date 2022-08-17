package com.ssafy.drinkus.dailyboard.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.dailyboard.request.DailyBoardCreateRequest;
import com.ssafy.drinkus.dailyboard.request.DailyBoardUpdateRequest;
import com.ssafy.drinkus.dailyboard.response.DailyBoardResponse;
import com.ssafy.drinkus.dailyboard.response.MyBoardResponse;
import com.ssafy.drinkus.dailyboard.service.DailyBoardService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/daily")
@RequiredArgsConstructor
public class DailyBoardController {

    private final DailyBoardService dailyBoardService;

    // 원글 조회
    @GetMapping
    public ResponseEntity<Page<DailyBoardResponse>> findByParentIdIsNullOrderByCreatedDateDesc(@PageableDefault Pageable page) {
        Page<DailyBoardResponse> body = dailyBoardService.findByParentIdIsNullOrderByCreatedDateDesc(page);
        return ResponseEntity.ok().body(body);
    }

    // 글번호로 조회
    @GetMapping("/{board_id}")
    public ResponseEntity<DailyBoardResponse> findById(@PathVariable("board_id") Long boardId) {
        DailyBoardResponse body = dailyBoardService.findById(boardId);
        return ResponseEntity.ok().body(body);
    }

    // 댓글 조회
    @GetMapping("/comment/{parent_id}")
    public ResponseEntity<List<DailyBoardResponse>> findByParentIdOrderByCreatedDateDesc( @PathVariable("parent_id") Long parentId) {
        List<DailyBoardResponse> body = dailyBoardService.findByParentIdOrderByCreatedDateDesc(parentId);
        return ResponseEntity.ok().body(body);
    }

    // 내가 쓴 글 조회
    @GetMapping("/my")
    public ResponseEntity<Page<MyBoardResponse>> findByCreater(@LoginUser User user, @PageableDefault Pageable page) {
        Page<MyBoardResponse> body = dailyBoardService.findByCreater(user, page);
        return ResponseEntity.ok().body(body);
    }

    // 글 작성
    @PostMapping
    public ResponseEntity<Long> createDailyBoard(@LoginUser User user, @RequestBody @Valid DailyBoardCreateRequest request) {
        Long body = dailyBoardService.createDailyBoard(user, request);
        return ResponseEntity.ok().body(body);
    }

    // 댓글 작성
    @PostMapping("/comment/{parent_id}")
    public ResponseEntity<Void> createComment(@LoginUser User user, @RequestBody @Valid DailyBoardCreateRequest request, @PathVariable("parent_id") Long parentId) {
        dailyBoardService.createComment(user, request, parentId);
        return ResponseEntity.ok().build();
    }

    // 글 수정
    @PutMapping("/{board_id}")
    public ResponseEntity<Void> updateDailyBoard(@LoginUser User user, @RequestBody @Valid DailyBoardUpdateRequest request, @PathVariable("board_id") Long boardId) {
        dailyBoardService.updateDailyBoard(user, request, boardId);
        return ResponseEntity.ok().build();
    }

    // 글 삭제
    @DeleteMapping("/{board_id}")
    public ResponseEntity<Void> deleteDailyBoard(@LoginUser User user, @PathVariable("board_id") Long boardId) {
        dailyBoardService.deleteDailyBoard(user, boardId);
        return ResponseEntity.ok().build();
    }
}
