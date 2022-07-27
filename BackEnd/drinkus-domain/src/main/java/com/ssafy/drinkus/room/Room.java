package com.ssafy.drinkus.room;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
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

    private Long roomAdminId;

    private String roomPw;

    @Enumerated(EnumType.STRING)
    private YN isActived;

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

    @Enumerated(EnumType.STRING)
    private String interestFirst;

    @Enumerated(EnumType.STRING)
    private String interestSecond;

    @Enumerated(EnumType.STRING)
    private String interestThird;

    @OneToMany(mappedBy = "room")
    private List<RoomHistory> roomHistories = new ArrayList<>();

}
