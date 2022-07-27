package com.ssafy.drinkus.room.response;

import com.ssafy.drinkus.room.Room;
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
        return new RoomListResponse(
                room.getRoomId(),
                room.getRoomName(),
                room.getPlaceTheme(),
                room.getPeopleLimit(),
                room.getCreatedDate());
    }
}
