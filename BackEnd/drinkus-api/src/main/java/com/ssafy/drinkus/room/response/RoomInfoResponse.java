package com.ssafy.drinkus.room.response;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfoResponse {
    private Long roomId;
    private String roomName;
    private UserMyInfoResponse user;
    private String roomPw;
    private String placeTheme;
    private Integer peopleLimit;
    private LocalDateTime createdDate;
    // 연령대
    YN[] ages; // 나이대
    //관심사
    private Long categoryId;
    private String categoryName;

    public static RoomInfoResponse from(Room room){
        RoomInfoResponse roomInfoResponse = new RoomInfoResponse();
        roomInfoResponse.roomId = room.getRoomId();
        roomInfoResponse.roomName = room.getRoomName();
        roomInfoResponse.user = UserMyInfoResponse.from(room.getUser());
        roomInfoResponse.placeTheme = room.getPlaceTheme();
        roomInfoResponse.peopleLimit = room.getPeopleLimit();
        roomInfoResponse.createdDate = room.getCreatedDate();
        roomInfoResponse.ages = room.getAges();
        roomInfoResponse.roomPw = room.getRoomPw();

        roomInfoResponse.categoryId = room.getCategory() != null ? room.getCategory().getCategoryId() : null;
        roomInfoResponse.categoryName = room.getCategory() != null ? room.getCategory().getCategoryName() : null;
        return roomInfoResponse;
    }
}
