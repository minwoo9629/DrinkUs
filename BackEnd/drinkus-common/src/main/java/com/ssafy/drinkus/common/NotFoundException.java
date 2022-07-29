package com.ssafy.drinkus.common;

public class NotFoundException extends RuntimeException {

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    
    public static final String BOARD_DAILY_NOT_FOUND = "존재하지 않는 글 번호입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
