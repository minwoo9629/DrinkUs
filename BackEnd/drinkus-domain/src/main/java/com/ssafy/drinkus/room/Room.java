package com.ssafy.drinkus.room;

import com.ssafy.drinkus.common.Ages;
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

    // 관심사

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "ages_id")
    private Ages ages;

    @OneToMany(mappedBy = "room")
    private List<RoomHistory> roomHistories = new ArrayList<>();

}
