package com.ssafy.drinkus.game.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BombResultResponse {
    private String nickname;
    private Boolean result;
}
