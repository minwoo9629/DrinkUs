package com.ssafy.drinkus.room.response;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
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
    private YN ages20;
    private YN ages30;
    private YN ages40;
    private YN ages50;
    private YN ages60;
    private YN ages70;
    //관심사
    private CategoryResponse category;

    public static RoomInfoResponse from(Room room){
        RoomInfoResponse roomInfoResponse = new RoomInfoResponse();
        roomInfoResponse.roomId = room.getRoomId();
        roomInfoResponse.roomName = room.getRoomName();
        roomInfoResponse.user = UserMyInfoResponse.from(room.getUser());
        roomInfoResponse.roomPw = room.getRoomPw();
        roomInfoResponse.placeTheme = room.getPlaceTheme();
        roomInfoResponse.createdDate = room.getCreatedDate();
        roomInfoResponse.ages20 = room.getAges20();
        roomInfoResponse.ages30 = room.getAges30();
        roomInfoResponse.ages40 = room.getAges40();
        roomInfoResponse.ages50 = room.getAges50();
        roomInfoResponse.ages60 = room.getAges60();
        roomInfoResponse.ages70 = room.getAges70();
        roomInfoResponse.category = CategoryResponse.from(room.getCategory());
        return roomInfoResponse;
    }
}
