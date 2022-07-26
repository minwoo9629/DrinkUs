package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;


    @GetMapping("/success")
    public ResponseEntity<?> signinSuccess() {
        return ResponseEntity.ok("JWT 발행 성공");
    }

}
