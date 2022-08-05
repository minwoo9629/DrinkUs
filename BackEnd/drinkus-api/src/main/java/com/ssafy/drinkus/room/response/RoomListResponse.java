package com.ssafy.drinkus.room.response;

import com.ssafy.drinkus.room.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomListResponse {
    private Long roomId;

    private String roomName;

    private String placeTheme;

    private Integer peopleLimit;

    private LocalDateTime createdDate;

    public static RoomListResponse from(Room room){
        RoomListResponse roomListResponse = new RoomListResponse();
        roomListResponse.roomId = room.getRoomId();
        roomListResponse.roomName = room.getRoomName();
        roomListResponse.placeTheme = room.getPlaceTheme();
        roomListResponse.peopleLimit = room.getPeopleLimit();
        roomListResponse.createdDate = room.getCreatedDate();
        return roomListResponse;
    }
}
