package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomConnectRequest {
    private Long roomId;
    private String roomPw;
}
