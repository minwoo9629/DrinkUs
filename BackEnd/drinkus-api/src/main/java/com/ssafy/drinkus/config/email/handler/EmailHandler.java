package com.ssafy.drinkus.config.email.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@RequiredArgsConstructor
public class EmailHandler {
    private JavaMailSender sender;
    private MimeMessage message;
    private MimeMessageHelper messageHelper;


    // 생성자
    public EmailHandler(JavaMailSender jSender) throws MessagingException{
        this.sender = jSender;
        message = jSender.createMimeMessage();
        messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    }

    // 발신자 이메일
    public void setFrom(String fromAddress) throws MessagingException {
        messageHelper.setFrom(fromAddress);
    }

    // 수신자 이메일
    public void setTo(List<String> toAddressList) throws MessagingException {
        messageHelper.setTo(toAddressList.toArray(new String[toAddressList.size()]));
    }

    // 제목
    public void setSubject(String subject) throws MessagingException {
        messageHelper.setSubject(subject);
    }

    // 메일 내용
    public void setText(String text, boolean useHtml) throws MessagingException {
        messageHelper.setText(text, useHtml);
    }

    // 발송
    public void send(){
        try{
            sender.send(message);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
