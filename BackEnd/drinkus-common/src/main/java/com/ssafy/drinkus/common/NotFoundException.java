package com.ssafy.drinkus.common;

public class NotFoundException extends RuntimeException {

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public  static final String ROOM_NOT_FOUND = "존재하지 않는 방정보 입니다.";
    public static final String CATEGORY_NOT_FOUND = "존재하지 않는 카테고리입니다.";
    public static final String SUBCATEGORY_NOT_FOUND = "존재하지 않는 관심사입니다.";
    public static final String BOARD_DAILY_NOT_FOUND = "존재하지 않는 글 번호입니다.";
    public static final String BOARD_CALENDAR_NOT_FOUND = "존재하지 않는 일정 번호입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
