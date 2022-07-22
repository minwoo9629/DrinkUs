package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.request.*;
import com.ssafy.drinkus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/join")
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok().build();
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request){
        String accessToken = userService.loginUser(request);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, accessToken).build();
    }

    //회원수정
    @PutMapping
    public ResponseEntity<Void> updateUser(@LoginUser Long userId,
                                           @RequestBody @Valid UserUpdateRequest request){
        userService.updateUser(userId, request);
        return ResponseEntity.ok().build();
    }

    // 비밀번호 수정
    @PatchMapping("/pw")
    public ResponseEntity<Void> updatePassword(@LoginUser Long userId,
                                               @RequestBody @Valid UserUpdatePasswordRequest request){
        userService.updatePassword(userId, request);
        return ResponseEntity.ok().build();
    }

    //회원탈퇴


    // 아이디 중복 검사
    @PostMapping("/join/id")
    public ResponseEntity<Void> findByUserId(@RequestPart String userName){
        userService.findByUserName(userName);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 인기도 수정
    @PatchMapping("/popularity")
    public ResponseEntity<Void> updatePopularity(@LoginUser Long userNo, @RequestBody UserPopularityRequest request){
        userService.updatePopularity(userNo, request.getPopularNum());
        return ResponseEntity.ok().build();
    }

}
