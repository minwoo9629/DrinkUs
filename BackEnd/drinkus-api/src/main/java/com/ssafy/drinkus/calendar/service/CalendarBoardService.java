package com.ssafy.drinkus.calendar.service;

import com.ssafy.drinkus.calendar.domain.CalendarBoard;
import com.ssafy.drinkus.calendar.domain.CalendarBoardRepository;
import com.ssafy.drinkus.calendar.request.CalendarBoardCreateRequest;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarBoardService {

    private final CalendarBoardRepository calendarBoardRepository;

    // 일정 생성
    @Transactional
    public void createCalendarBoard(User user, CalendarBoardCreateRequest request) {
        System.out.println("CalendarBoardService.createCalendarBoard");

        CalendarBoard calendarBoard = CalendarBoard.createCalendarBoard(user, request.getCalendarTitle(), request.getCalendarDescription(), request.getCalendarDatetime(), request.getPeopleLimit(), request.getPlace(), request.getAges());
        
        System.out.println("calendarBoard = " + calendarBoard.getCalendarDatetime());
        calendarBoardRepository.save(calendarBoard);
    }
}
