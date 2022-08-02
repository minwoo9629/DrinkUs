package com.ssafy.drinkus.calendar.response;

import com.ssafy.drinkus.calendar.domain.CalendarBoard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyCalendarResponse {

    Long calendarId; // 일정 번호

    String calendarContent; // 내용

    LocalDateTime time; // 시간

    public static MyCalendarResponse from(CalendarBoard calendarBoard){
        return new MyCalendarResponse(calendarBoard.getCalendarId(), calendarBoard.getCalendarContent(), calendarBoard.getCalendarDatetime());
    }
}
