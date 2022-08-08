package com.ssafy.drinkus.common;

public class NotProcessedException extends RuntimeException{

    public static final String NOT_PROCESSED_REPORT = "아직 처리되지 않은 동일한 유저를 재신고할 수 없습니다.";

    public NotProcessedException(String message) {
        super(message);
    }
}
