package com.ssafy.drinkus.auth.controller;

import com.ssafy.drinkus.auth.request.TokenRequest;
import com.ssafy.drinkus.auth.response.TokenResponse;
import com.ssafy.drinkus.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 리프레시 토큰 재발급
    @PostMapping("/refreshToken")
    public ResponseEntity<TokenResponse> reissueRefreshToken(@RequestBody @Valid TokenRequest request){
        TokenResponse token = authService.reissue(request);
        return ResponseEntity.ok().body(token);
    }


}
