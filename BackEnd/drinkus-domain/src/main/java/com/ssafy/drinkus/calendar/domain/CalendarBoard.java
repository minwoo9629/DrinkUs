package com.ssafy.drinkus.calendar.domain;


import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.domain.RoomHistory;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class CalendarBoard extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private Long calendarId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creater_id")
    private User creater; // 등록자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modifier_id")
    private User modifier; // 수정자

    private String calendarContent; // 내용

    private LocalDateTime calendarDatetime; // 예약일자

    private Integer peopleLimit; // 인원 수

    private String place; // 장소


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


    @OneToMany(mappedBy = "calendarBoard")
    private List<User> userList = new ArrayList<>();

    public YN[] getAges(){
        YN[] ages = new YN[6];
        ages[0] = this.ages20;
        ages[1] = this.ages30;
        ages[2] = this.ages40;
        ages[3] = this.ages50;
        ages[4] = this.ages60;
        ages[5] = this.ages70;
        return ages;
    }

    private static void setAges(CalendarBoard calendarBoard, YN[] ages) {
        calendarBoard.ages20 = ages[0];
        calendarBoard.ages30 = ages[1];
        calendarBoard.ages40 = ages[2];
        calendarBoard.ages50 = ages[3];
        calendarBoard.ages60 = ages[4];
        calendarBoard.ages70 = ages[5];
    }

    // 일정 생성하기
    public static CalendarBoard createCalendarBoard(User creater, String calendarContent, LocalDateTime calendarDatetime,
                                                    Integer peopleLimit, String place, YN[] ages) {
        CalendarBoard calendarBoard = new CalendarBoard();
        calendarBoard.creater = creater;
        calendarBoard.modifier = creater;
        calendarBoard.calendarContent = calendarContent;
        calendarBoard.calendarDatetime = calendarDatetime;
        calendarBoard.peopleLimit = peopleLimit;
        calendarBoard.place = place;
        setAges(calendarBoard, ages);
        return calendarBoard;
    }

    // 일정 수정하기 (수정자, 내용, 예약일자, 인원 수, 나이대, 장소)
    public void updateCalendarBoard(User modifier, String calendarContent, LocalDateTime calendarDatetime,
                           Integer peopleLimit, String place, YN[] ages) {
        this.modifier = modifier;
        this.calendarContent = calendarContent;
        this.calendarDatetime = calendarDatetime;
        this.peopleLimit = peopleLimit;
        this.place = place;
        setAges(this, ages);
    }
}

