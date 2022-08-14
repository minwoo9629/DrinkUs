package com.ssafy.drinkus.common;

public class RoomException extends RuntimeException{

    public static final String ALREADY_JOIN = "이미 방에 접속중입니다.";
    public static final String JOINING_OTHER_ROOM = "현재 접속중인 방에서 퇴장 후 접속해주세요.";

    public RoomException(String message){
        super(message);
    }
}
