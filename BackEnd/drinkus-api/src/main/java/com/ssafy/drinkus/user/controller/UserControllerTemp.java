package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import com.ssafy.drinkus.user.service.UserServiceTemp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserControllerTemp {
    private final UserServiceTemp userService;

    // 프로필 조회
    @GetMapping("/profile/{user_id}")
    public ResponseEntity<UserProfileResponse> findUserProfile(@PathVariable("user_id")Long userId){
        UserProfileResponse body = userService.findUserProfile(userId);
        return ResponseEntity.ok().body(body);
    }

    // 마이페이지 내정보 조회
    @GetMapping("{user_id}")
    public ResponseEntity<UserMyInfoResponse> findUserMyInfo(@PathVariable("user_id")Long userId){
        UserMyInfoResponse body = userService.findUserMyInfo(userId);
        System.out.println(body.getUserName());
        return ResponseEntity.ok().body(body);
    }

    // 회원 비활성화 (탈퇴 대기)
    @PutMapping("/disable/{user_id}")
    public ResponseEntity<Void> disableUser(@PathVariable("user_id") Long userId) {
        userService.disableUser(userId);
        return ResponseEntity.ok().build();
    }
}
