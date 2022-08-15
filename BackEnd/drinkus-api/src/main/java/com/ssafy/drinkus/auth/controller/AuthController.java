package com.ssafy.drinkus.auth.controller;

import com.ssafy.drinkus.auth.request.TokenRequest;
import com.ssafy.drinkus.auth.response.TokenResponse;
import com.ssafy.drinkus.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 리프레시 토큰 재발급
    @GetMapping("/refreshToken")
    public ResponseEntity<TokenResponse> reissueRefreshToken(
            @RequestHeader(value="authorization") String accessToken,
            @RequestHeader(value = "refreshtoken") String refreshToken){
        System.out.println("accesstoken => " + accessToken);
        System.out.println("refreshtoken => " + refreshToken);
        TokenRequest request = new TokenRequest(accessToken.substring(7), refreshToken);
        TokenResponse token = authService.reissue(request);
        return ResponseEntity.ok()
                .header("accesstoken", token.getAccessToken())
                .header("refreshtoken", token.getRefreshToken())
                .build();
    }

}
