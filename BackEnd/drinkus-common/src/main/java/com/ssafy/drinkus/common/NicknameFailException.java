package com.ssafy.drinkus.common;

public class NicknameFailException extends RuntimeException{

    public static final String MAKE_FAIL = "닉네임 생성에 실패했습니다.";

    public NicknameFailException(String message) {
        super(message);
    }
}
