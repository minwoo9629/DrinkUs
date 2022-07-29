package com.ssafy.drinkus.config.email.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.EmailAuthTokenNotFoundException;
import com.ssafy.drinkus.config.email.handler.EmailHandler;
import com.ssafy.drinkus.config.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.config.email.request.UserNameCheckRequest;
import com.ssafy.drinkus.config.email.dto.EmailDto;
import com.ssafy.drinkus.emailauth.EmailAuth;
import com.ssafy.drinkus.emailauth.EmailAuthRepository;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.UUID;

@EnableAsync
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final UserRepository userRepository;
    private final EmailAuthRepository emailAuthRepository;

    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Transactional
    public void createEmailAuth(UserNameCheckRequest request) throws MessagingException {
        if (userRepository.existsByUserName(request.getUserName())){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
        EmailAuth emailAuth = EmailAuth.createEmailAuth(request.getUserName(), UUID.randomUUID().toString());
        emailAuthRepository.save(emailAuth);
        sendUserNameCheckEmail(emailAuth.getUserName(), emailAuth.getAuthToken());
    }

    @Transactional
    public void confirmUserName(UserNameAuthRequest request){
        EmailAuth emailAuth = emailAuthRepository.findByUserNameAndAuthTokenAndExpireDateAfter(request.getUserName(), request.getAuthToken(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthTokenNotFoundException(EmailAuthTokenNotFoundException.TOKEN_NOT_FOUND));
        emailAuth.useToken(); // 토큰 사용 완료 처리
    }

    @Async
    public void sendUserNameCheckEmail(String userName, String authToken) throws MessagingException {
        // 이메일 발송 정보 설정
        EmailDto emailDto = new EmailDto();
        emailDto.setFromAddress(sender);
        emailDto.addToAddress(userName);
        emailDto.setTitle("[DrinkUs] 이메일 인증번호입니다.");
        emailDto.setContent(makeUserNameCheckMessage(authToken));

        sendEmail(emailDto);
    }

    public String makeUserNameCheckMessage(String authToken){
        System.out.println("*** makeUserNameCheckMessage ***");
        StringBuilder content = new StringBuilder();
        content.append("<div class='container' align='left'>");
        content.append("    <div>안녕하세요, DrinkUs입니다. 이메일 인증번호를 입력해주세요.</div><div>");
        content.append(authToken);
        content.append("</div>>");
        content.append("</div>");
        return content.toString();
    }

    public void sendEmail(EmailDto emailDto) throws MessagingException {
        EmailHandler emailHandler = new EmailHandler(mailSender);
        emailHandler.setFrom(emailDto.getFromAddress());
        emailHandler.setTo(emailDto.getToAddressList());
        emailHandler.setSubject(emailDto.getTitle());
        emailHandler.setText(emailDto.getContent(), true);
        emailHandler.send();
    }
}
