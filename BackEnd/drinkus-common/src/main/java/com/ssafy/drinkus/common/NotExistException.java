package com.ssafy.drinkus.common;

public class NotExistException extends RuntimeException{
    public static final String POPULARITY_NOT_EXIST = "오늘의 인기도 수정 횟수를 모두 사용했습니다.";
    public NotExistException(String message) {
        super(message);
    }
}
