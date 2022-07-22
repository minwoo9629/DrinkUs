package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.request.UserCreateRequest;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import com.ssafy.drinkus.user.request.UserUpdatePasswordRequest;
import com.ssafy.drinkus.user.request.UserUpdateRequest;
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
    @PostMapping("/users/login")
    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request){
        String accessToken = userService.loginUser(request);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, accessToken).build();
    }

    //회원수정
    @PatchMapping("/users")
    public ResponseEntity<Void> updateUser(@LoginUser User user,
                                           @RequestBody @Valid UserUpdateRequest request){
        userService.updateUser(request, user);
        return ResponseEntity.ok().build();
    }

    // 비밀번호 수정
    @PatchMapping("/pw")
    public ResponseEntity<Void> updatePassword(@RequestBody @Valid UserUpdatePasswordRequest request){
        userService.updatePassword(request);
        return ResponseEntity.ok().build();
    }

    //회원탈퇴


    // 아이디 중복 검사
    // part로 보내줌
    @PostMapping("/join/id")
    public ResponseEntity<Void> findByUserId(@RequestPart String id){
        userService.findByUserId(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
