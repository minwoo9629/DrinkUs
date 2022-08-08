package com.ssafy.drinkus.friend.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.friend.response.FriendListResponse;
import com.ssafy.drinkus.friend.service.FriendService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    //친구 추가
    @PostMapping("/{user_id}")
    public ResponseEntity<Void> createFriend(@LoginUser User user, @PathVariable("user_id") Long userId){
        friendService.createFriend(user, userId);
        return ResponseEntity.ok().build();
    }

    //회원의 친구 리스트 조회 -> 로그인 접속 여부 확인
    @GetMapping
    public ResponseEntity<List<FriendListResponse>> findByFromUserId(@LoginUser User user){
        List<FriendListResponse> body = friendService.findByFromUserId(user);
        return ResponseEntity.ok().body(body);
    }

    //친구 삭제
    @DeleteMapping("/{user_id}")
    public ResponseEntity<Void> deleteFriend(@LoginUser User user, @PathVariable("user_id") Long userId){
        friendService.deleteFriend(user, userId);
        return ResponseEntity.ok().build();
    }
}
