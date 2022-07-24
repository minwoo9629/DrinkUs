package com.ssafy.drinkus.common;

public class MailSendFailException extends RuntimeException{
    public static final String MAIL_SEND_FAIL = "이메일 발송에 실패했습니다.";

    public MailSendFailException(String message) {
        super(message);
    }
}
