package com.ssafy.drinkus.config.email.controller;

import com.ssafy.drinkus.config.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.config.email.request.UserNameCheckRequest;
import com.ssafy.drinkus.config.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    // 회원가입 이메일 인증 발송
    @PostMapping("/sendCheckMail")
    public ResponseEntity<Void> sendUserNameCheckEmail(@RequestBody @Valid UserNameCheckRequest request) throws MessagingException {
        System.out.println("*** EmailController - sendUserNameCheckEmail ***");
        emailService.createEmailAuth(request);
        return ResponseEntity.ok().build();
    }

    // 이메일 토큰 인증 확인
    @PatchMapping("/confirm")
    public ResponseEntity<Void> confirmUserNameCheck(@RequestBody @Valid UserNameAuthRequest request){
        emailService.confirmUserName(request);
        return ResponseEntity.ok().build();
    }
}
