package com.ssafy.drinkus.calendar.domain;

import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class UserCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_calendar_id")
    private Long userCalendarId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 해당 회원
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id")
    private CalendarBoard calendarBoard; // 해당 일정

    public static UserCalendar createUserCalendar(User user, CalendarBoard calendarBoard){
        UserCalendar userCalendar = new UserCalendar();
        userCalendar.user = user;
        userCalendar.calendarBoard = calendarBoard;

        return userCalendar;
    }
}
