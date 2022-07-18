package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.request.UserCreateRequest;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import com.ssafy.drinkus.user.request.UserUpdateRequest;
import com.ssafy.drinkus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequest request){
        userService.createUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/login")
    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request){
        String accessToken = userService.loginUser(request);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, accessToken).build();
    }

    @PatchMapping("/users")
    //
    public ResponseEntity<Void> updateUser(@LoginUser User user,
                                           @RequestBody @Valid UserUpdateRequest request){
        userService.updateUser(request, user);
        return ResponseEntity.ok().build();
    }

}
