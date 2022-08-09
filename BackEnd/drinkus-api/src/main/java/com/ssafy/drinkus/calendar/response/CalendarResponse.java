package com.ssafy.drinkus.calendar.response;

import com.ssafy.drinkus.calendar.domain.CalendarBoard;
import com.ssafy.drinkus.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarResponse {

    Long calendarId; // 일정 번호

    String calendarContent; // 내용

    LocalDateTime time; // 시간

    String place; // 장소

    Integer peopleLimit;  // 최대인원

    Long participant; // 현재참여인원

    YN[] ages; // 나이대

    Boolean isParticipate; // 참여여부

    public static CalendarResponse from(CalendarBoard calendarBoard, Long participant, Boolean isParticipate){
        return new CalendarResponse(calendarBoard.getCalendarId(), calendarBoard.getCalendarContent(), calendarBoard.getCalendarDatetime(), calendarBoard.getPlace(), calendarBoard.getPeopleLimit(), participant, calendarBoard.getAges(), isParticipate);
    }
}
