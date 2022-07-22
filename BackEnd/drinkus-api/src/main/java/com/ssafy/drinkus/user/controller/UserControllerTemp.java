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
    @GetMapping("/profile/{user_no}")
    public ResponseEntity<UserProfileResponse> findUserProfile(@PathVariable("user_no")Long userNo){
        UserProfileResponse body = userService.findUserProfile(userNo);
        return ResponseEntity.ok().body(body);
    }

    // 마이페이지 내정보 조회
    @GetMapping("{user_no}")
    public ResponseEntity<UserMyInfoResponse> findUserMyInfo(@PathVariable("user_no")Long userNo){
        UserMyInfoResponse body = userService.findUserMyInfo(userNo);
        return ResponseEntity.ok().body(body);
    }

    // 회원 비활성화 (탈퇴 대기)
    @PutMapping("/disable/{user_no}")
    public ResponseEntity<Void> disableUser(@PathVariable("user_no") Long userNo) {
        userService.disableUser(userNo);
        return ResponseEntity.ok().build();
    }
}
