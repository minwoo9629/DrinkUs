package com.ssafy.drinkus.calendar.controller;

import com.ssafy.drinkus.calendar.request.CalendarBoardRequest;
import com.ssafy.drinkus.calendar.service.CalendarBoardService;
import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarBoardController {

    private final CalendarBoardService calendarBoardService;

    // 일정 생성
    @PostMapping
    public ResponseEntity<Void> createCalendarBoard(@LoginUser User user, @RequestBody @Valid CalendarBoardRequest request) {
        calendarBoardService.createCalendarBoard(user, request);
        return ResponseEntity.ok().build();
    }

    // 일정 수정
    @PutMapping("/{calendar_id}")
    public ResponseEntity<Void> updateDailyBoard(@LoginUser User user, @RequestBody @Valid CalendarBoardRequest request, @PathVariable("calendar_id") Long calendarId) {
        calendarBoardService.updateCalendarBoard(user, request, calendarId);
        return ResponseEntity.ok().build();
    }

    // 일정 삭제
    @DeleteMapping("/{calendar_id}")
    public ResponseEntity<Void> deleteDailyBoard(@LoginUser User user, @PathVariable("calendar_id") Long calendarId) {
        calendarBoardService.deleteCalendarBoard(user, calendarId);
        return ResponseEntity.ok().build();
    }

    // 일정 참가
    @PostMapping("/join/{calendar_id}")
    public ResponseEntity<Void> joinCalendar(@LoginUser User user, @PathVariable("calendar_id") Long calendarId) {
        calendarBoardService.joinCalendar(user, calendarId);
        return ResponseEntity.ok().build();
    }

    // 일정 참가 취소
    @DeleteMapping("/join/{calendar_id}")
    public ResponseEntity<Void> cancelCalendar(@LoginUser User user, @PathVariable("calendar_id") Long calendarId) {
        calendarBoardService.cancelCalendar(user, calendarId);
        return ResponseEntity.ok().build();
    }
}
