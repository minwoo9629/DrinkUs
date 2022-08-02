package com.ssafy.drinkus.calendar.domain;


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

    private String calendarTitle; // 제목

    private String calendarDescription; // 설명

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

    private static void setAges(CalendarBoard calendarBoard, YN[] ages) {
        calendarBoard.ages20 = ages[0];
        calendarBoard.ages30 = ages[1];
        calendarBoard.ages40 = ages[2];
        calendarBoard.ages50 = ages[3];
        calendarBoard.ages60 = ages[4];
        calendarBoard.ages70 = ages[5];
    }

    // 일정 생성하기
    public static CalendarBoard createCalendarBoard(User creater, String calendarTitle, String calendarDescription, LocalDateTime calendarDatetime,
                                                    Integer peopleLimit, String place, YN[] ages) {
        CalendarBoard calendarBoard = new CalendarBoard();
        calendarBoard.creater = creater;
        calendarBoard.modifier = creater;
        calendarBoard.calendarTitle = calendarTitle;
        calendarBoard.calendarDescription = calendarDescription;
        calendarBoard.calendarDatetime = calendarDatetime;
        calendarBoard.peopleLimit = peopleLimit;
        calendarBoard.place = place;
        setAges(calendarBoard, ages);
        return calendarBoard;
    }

    // 일정 수정하기 (수정자, 제목, 설명, 예약일자, 인원 수, 나이대, 장소)
    public void updateRoom(User modifier, String calendarTitle, String calendarDescription, LocalDateTime calendarDatetime,
                           Integer peopleLimit, YN[] ages) {
        this.modifier = modifier;
        this.calendarTitle = calendarTitle;
        this.calendarDescription = calendarDescription;
        this.calendarDatetime = calendarDatetime;
        this.peopleLimit = peopleLimit;
        this.place = place;
        setAges(this, ages);
    }
}

