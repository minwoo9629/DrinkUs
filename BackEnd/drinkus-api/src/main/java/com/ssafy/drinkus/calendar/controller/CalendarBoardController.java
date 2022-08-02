package com.ssafy.drinkus.calendar.controller;

import com.ssafy.drinkus.calendar.request.CalendarBoardCreateRequest;
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

    @PostMapping
    public ResponseEntity<Void> createCalendarBoard(@LoginUser User user, @RequestBody @Valid CalendarBoardCreateRequest request) {
        calendarBoardService.createCalendarBoard(user, request);
        return ResponseEntity.ok().build();
    }

}
