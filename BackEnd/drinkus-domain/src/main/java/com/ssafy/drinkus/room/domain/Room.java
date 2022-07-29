package com.ssafy.drinkus.room;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.Category;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    private String roomName;

    //방장
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_admin_id")
    private User roomAdminId;

    private String roomPw;

    private String placeTheme;

    private Integer peopleLimit;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_20")
    private YN ages20;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_30")
    private YN ages30;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_40")
    private YN ages40;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_50")
    private YN ages50;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_60")
    private YN ages60;

    @Enumerated(EnumType.STRING)
    @Column(name = "ages_70")
    private YN ages70;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "room")
    private List<RoomHistory> roomHistories = new ArrayList<>();

    //방 생성하기
    public static Room createRoom(String roomName, User roomAdminId, String roomPw, String placeTheme, Integer peopleLimit,
                                  YN ages20, YN ages30, YN ages40, YN ages50, YN ages60, YN ages70, Long category) {
        Room room = new Room();
        room.roomName = roomName;
        room.roomAdminId = roomAdminId;
        room.roomPw = roomPw;
        room.placeTheme = placeTheme;
        room.peopleLimit = peopleLimit;
        room.ages20 = ages20;
        room.ages30 = ages30;
        room.ages40 = ages40;
        room.ages50 = ages50;
        room.ages60 = ages60;
        room.ages70 = ages70;
        room.category.getCategoryId() = category;
        return room;
    }

    //방 수정하기 (제목, 나이, 관심사, 인원, 비밀번호)
    public void updateRoom(String roomName, String roomPw, Integer peopleLimit,  YN ages20, YN ages30, YN ages40,YN ages50, YN ages60, YN ages70, Category category) {
        this.roomName = roomName;
        this.roomPw = roomPw;
        this.peopleLimit = peopleLimit;
        this.ages20 = ages20;
        this.ages30 = ages30;
        this.ages40 = ages40;
        this.ages50 = ages50;
        this.ages60 = ages60;
        this.ages70 = ages70;
        this.category = category;
    }

    // 방 삭제하기

}
