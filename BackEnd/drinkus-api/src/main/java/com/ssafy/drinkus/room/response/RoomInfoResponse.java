package com.ssafy.drinkus.room.response;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfoResponse {
    private Long roomId;
    private String roomName;
    private Long roomAdminId;
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
    private String interestFirst;
    private String interestSecond;
    private String interestThird;

    public static RoomInfoResponse from(Room room){
        return new RoomInfoResponse(
                room.getRoomId(),
                room.getRoomName(),
                room.getRoomAdminId(),
                room.getRoomPw(),
                room.getPlaceTheme(),
                room.getPeopleLimit(),
                room.getCreatedDate(),
                room.getAges20(),
                room.getAges30(),
                room.getAges40(),
                room.getAges50(),
                room.getAges60(),
                room.getAges70(),
                room.getInterestFirst(),
                room.getInterestSecond(),
                room.getInterestThird());
    }
}
