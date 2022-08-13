package com.ssafy.drinkus.common;

public class NotMatchException extends RuntimeException {
    public static final String USER_NOT_MATCH = "회원의 정보가 일치하지 않습니다.";
    public static final String PW_NOT_MATCH = "비밀번호가 일치하지 않습니다.";
    public static final String EMAIL_TOKEN_NOT_FOUND = "인증 코드가 만료되었거나 일치하지 않습니다. 인증을 다시 진행해주세요.";

    public static final String ROOM_HISTORY_NOT_MATCH = "일치하는 사용자의 방 접속 기록이 없습니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
