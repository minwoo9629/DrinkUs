package com.ssafy.drinkus.common;

public class RoomNameExistsException extends RuntimeException{
    public static final String ROOM_NAME_EXISTS = "해당하는 방 이름이 이미 존재합니다.";

    public RoomNameExistsException(String message) {
        super(message);
    }
}
