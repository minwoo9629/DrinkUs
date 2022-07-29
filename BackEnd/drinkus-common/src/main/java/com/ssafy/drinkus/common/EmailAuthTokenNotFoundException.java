package com.ssafy.drinkus.common;

public class EmailAuthTokenNotFoundException extends RuntimeException{
    public static final String TOKEN_NOT_FOUND = "인증 코드가 만료되었거나 비정상 접근입니다. 인증을 다시 진행해주세요.";

    public EmailAuthTokenNotFoundException(String message) {
        super(message);
    }
}
