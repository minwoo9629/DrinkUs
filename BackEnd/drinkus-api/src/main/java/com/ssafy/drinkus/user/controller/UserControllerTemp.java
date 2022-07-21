package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.response.UserResponse;
import com.ssafy.drinkus.user.service.UserServiceTemp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserControllerTemp {
    private final UserServiceTemp userService;

    // 프로필 조회
    @GetMapping("{user_no}")
    public ResponseEntity<UserResponse> findUserById(@PathVariable("user_no")Long userNo){
        UserResponse body = userService.findUserById(userNo);
        return ResponseEntity.ok().body(body);
    }

    // 회원 비활성화 (탈퇴 대기)
    @PutMapping("/disable/{user_no}")
    public ResponseEntity<Void> disableUser(@PathVariable("user_no") Long userNo) {
        userService.disableUser(userNo);
        return ResponseEntity.ok().build();
    }

    // 회원 삭제
}
