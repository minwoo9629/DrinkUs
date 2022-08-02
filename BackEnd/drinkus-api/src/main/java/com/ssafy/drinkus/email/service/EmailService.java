package com.ssafy.drinkus.email.service;

import com.ssafy.drinkus.common.EmailAuthTokenNotFoundException;
import com.ssafy.drinkus.email.dto.Email;
import com.ssafy.drinkus.email.handler.EmailHandler;
import com.ssafy.drinkus.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.emailauth.domain.EmailAuth;
import com.ssafy.drinkus.emailauth.domain.EmailAuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDateTime;

@EnableAsync
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailAuthRepository emailAuthRepository;
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;

    public void saveEmailAuth(EmailAuth emailAuth){
        emailAuthRepository.save(emailAuth);
    }

    public void confirmEmailAuth(UserNameAuthRequest request){
        EmailAuth emailAuth = emailAuthRepository.findByUserNameAndAuthTokenAndExpireDateAfter(request.getUserName(), request.getAuthToken(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthTokenNotFoundException(EmailAuthTokenNotFoundException.TOKEN_NOT_FOUND));
        emailAuth.useToken(); // 토큰 사용 완료 처리
    }

    @Async
    public void sendUserNameCheckEmail(String userName, String authToken) throws MessagingException {
        // 이메일 발송 정보 설정
        Email emailDto = new Email();
        emailDto.setFromAddress(sender);
        emailDto.addToAddress(userName);
        emailDto.setTitle("[DrinkUs] 이메일 인증번호입니다.");
        emailDto.setContent(makeUserNameCheckMessage(authToken));

        sendEmail(emailDto);
    }

    @Async
    public void sendResetPwEmail(String userName, String password) throws MessagingException {
        // 이메일 발송 정보 설정
        Email emailDto = new Email();
        emailDto.setFromAddress(sender);
        emailDto.setTitle("[DrinkUs] 비밀번호 재설정 안내입니다.");
        StringBuilder content = new StringBuilder();
        content.append("<div class='container' align='left'>");
        content.append("    <div>안녕하세요, DrinkUs입니다.</div>");
        content.append("    <div>고객님의 비밀번호를 재설정하여 다음과 같이 알려드립니다.</div><br>");
        content.append("    <div>비밀번호 : <strong style='background-color: yellow;'>" + password +  "</strong></div><br>");
        content.append("    <div>안내된 비밀번호로 로그인 후 비밀번호 재설정 바랍니다.</div>");
        content.append("</div>");
        emailDto.setContent(content.toString());
        emailDto.addToAddress(userName);

        sendEmail(emailDto);
    }

    public String makeUserNameCheckMessage(String authToken){
        System.out.println("*** makeUserNameCheckMessage ***");
        StringBuilder content = new StringBuilder();
        content.append("<div class='container' align='left'>");
        content.append("    <div>안녕하세요, DrinkUs입니다. 이메일 인증번호를 입력해주세요.</div><div>");
        content.append(authToken);
        content.append("</div>");
        content.append("</div>");
        return content.toString();
    }

    public void sendEmail(Email emailDto) throws MessagingException {
        EmailHandler emailHandler = new EmailHandler(mailSender);
        emailHandler.setFrom(emailDto.getFromAddress());
        emailHandler.setTo(emailDto.getToAddressList());
        emailHandler.setSubject(emailDto.getTitle());
        emailHandler.setText(emailDto.getContent(), true);
        emailHandler.send();
    }
}
