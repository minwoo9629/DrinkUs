package com.ssafy.drinkus.room.domain;

import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.friend.domain.Friend;
import com.ssafy.drinkus.user.domain.User;
import lombok.*;

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
    @JoinColumn(name = "user_admin_id")
    private User user;

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

    @OneToMany(mappedBy = "fromUser")
    private List<Friend> fromFriends = new ArrayList<>();

    @OneToMany(mappedBy = "toUser")
    private List<Friend> toFriends = new ArrayList<>();

    private static void setAges(Room room, YN[] ages) {
        room.ages20 = ages[0];
        room.ages30 = ages[1];
        room.ages40 = ages[2];
        room.ages50 = ages[3];
        room.ages60 = ages[4];
        room.ages70 = ages[5];
    }

    //방 생성하기
    public static Room createRoom(String roomName, User user, String roomPw, String placeTheme, Integer peopleLimit,
                                  YN[] ages, Category category) {
        Room room = new Room();
        room.roomName = roomName;
        room.user = user;
        room.roomPw = roomPw;
        room.placeTheme = placeTheme;
        room.peopleLimit = peopleLimit;
        setAges(room, ages);
        room.category = category;
        return room;
    }

    //방 수정하기 (제목, 나이, 관심사, 인원, 비밀번호)
    public void updateRoom(String roomName, String roomPw, Integer peopleLimit, YN[] ages, Category category) {
        this.roomName = roomName;
        this.roomPw = roomPw;
        this.peopleLimit = peopleLimit;
        setAges(this, ages);
        this.category = category;
    }
}
