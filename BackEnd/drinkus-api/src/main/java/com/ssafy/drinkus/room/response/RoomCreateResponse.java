package com.ssafy.drinkus.room.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateResponse {

    private String roomId; // 방 고유키 역할을 하는 방 이름
    private String userNickname; // 닉네임
}
