package com.ssafy.drinkus.room.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.Category;
import com.ssafy.drinkus.room.Room;
import com.ssafy.drinkus.user.domain.User;
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
    private User roomAdminId;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String roomPw;
    private String placeTheme;
    private Integer peopleLimit;
    private LocalDateTime createdDate;
    // 연령대
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages20;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages30;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages40;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages50;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages60;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private YN ages70;
    //관심사
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Category categoryFirst;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Category categorySecond;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Category categoryThird;

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
                room.getCategoryFirst(),
                room.getCategorySecond(),
                room.getCategoryThird());
    }
}
