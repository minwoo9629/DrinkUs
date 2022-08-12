package com.ssafy.drinkus.game.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameIdRequest {
    private Long roomId;
}
