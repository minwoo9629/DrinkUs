package com.ssafy.drinkus.game.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BombResponse {
    private int second;

    private int clickCount;

    public static BombResponse from(int second, int clickCount){
        return new BombResponse(second, clickCount);
    }
}
