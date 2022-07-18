package com.ssafy.drinkus.common;

public class NotExistException extends RuntimeException{

    public NotExistException(String message) {
        super(message);
    }
}
