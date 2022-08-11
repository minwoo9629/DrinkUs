package com.ssafy.drinkus.room.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class RoomHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_history_id")
    private Long roomHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private YN isExited;

    //방히스토리 생성하기(히스토리 추가)
    public static RoomHistory createRoomHistory(Room room, User user) {
        RoomHistory roomHistory = new RoomHistory();
        roomHistory.room = room;
        roomHistory.user = user;
        roomHistory.isExited = YN.N;
        return roomHistory;
    }

    //방히스토리 수정 -> 회원의 퇴장에 따른 수정
    public void updateRoomHistory(YN isExited){
        this.isExited = YN.Y;
    }
}
