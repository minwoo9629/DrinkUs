package com.ssafy.drinkus.dailyboard.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.dailyboard.request.DailyBoardCreateRequest;
import com.ssafy.drinkus.dailyboard.response.DailyBoardResponse;
import com.ssafy.drinkus.dailyboard.request.DailyBoardUpdateRequest;
import com.ssafy.drinkus.dailyboard.response.MyBoardResponse;
import com.ssafy.drinkus.dailyboard.service.DailyBoardService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/daily")
@RequiredArgsConstructor
public class DailyBoardController {

    private final DailyBoardService dailyBoardService;

    // 원글 조회
//    @GetMapping
//    public ResponseEntity<List<DailyBoardResponse>> findByPages(@RequestParam(value = "page", required = false, defaultValue = "1") Long page) {
//        List<DailyBoardResponse> body = dailyBoardService.findByPages(page);
//        return ResponseEntity.ok().body(body);
//    }


    @GetMapping
    public ResponseEntity<List<DailyBoardResponse>> findByPages(@PageableDefault(size = 10) Pageable page) {
        List<DailyBoardResponse> body = dailyBoardService.findAll(page);
        return ResponseEntity.ok().body(body);
    }

    // 댓글 조회

    // 내가 쓴 글 조회
    @GetMapping("/my")
    public ResponseEntity<List<MyBoardResponse>> findMyUserName(@LoginUser User user, @RequestParam(value = "page", required = false, defaultValue = "1") Long page) {
        List<MyBoardResponse> body = dailyBoardService.findByCreaterId(user.getUserId(), page);
        return ResponseEntity.ok().body(body);
    }

    // 글 작성
    @PostMapping
    public ResponseEntity<Void> createDailyBoard(@LoginUser User user, @RequestBody @Valid DailyBoardCreateRequest request) {
        dailyBoardService.createDailyBoard(user.getUserId(), request);
        return ResponseEntity.ok().build();
    }

    // 댓글 작성
    @PostMapping("/comment/{parent_id}")
    public ResponseEntity<Void> createComment(@LoginUser User user, @RequestBody @Valid DailyBoardCreateRequest request, @PathVariable("parent_id") Long parentId) {
        dailyBoardService.createComment(user.getUserId(), request, parentId);
        return ResponseEntity.ok().build();
    }

    // 글 수정
    @PutMapping("/{board_id}")
    public ResponseEntity<Void> updateDailyBoard(@LoginUser User user, @RequestBody @Valid DailyBoardUpdateRequest request, @PathVariable("board_id") Long boardId) {
        dailyBoardService.updateDailyBoard(user.getUserId(), request, boardId);
        return ResponseEntity.ok().build();
    }

    // 글 삭제
    @DeleteMapping("/{board_id}")
    public ResponseEntity<Void> deleteDailyBoard(@LoginUser User user, @PathVariable("board_id") Long boardId) {
        dailyBoardService.deleteDailyBoard(user.getUserId(), boardId);
        return ResponseEntity.ok().build();
    }
}
