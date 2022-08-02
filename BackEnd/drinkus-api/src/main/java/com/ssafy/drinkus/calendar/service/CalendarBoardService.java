package com.ssafy.drinkus.calendar.service;

import com.ssafy.drinkus.calendar.domain.CalendarBoard;
import com.ssafy.drinkus.calendar.domain.CalendarBoardRepository;
import com.ssafy.drinkus.calendar.domain.UserCalendar;
import com.ssafy.drinkus.calendar.domain.UserCalendarRepository;
import com.ssafy.drinkus.calendar.request.CalendarBoardRequest;
import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.InvalidException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
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
    private final UserCalendarRepository userCalendarRepository;

    // 일정 생성
    @Transactional
    public void createCalendarBoard(User user, CalendarBoardRequest request) {
        CalendarBoard calendarBoard = CalendarBoard.createCalendarBoard(user, request.getCalendarContent(), request.getCalendarDatetime(), request.getPeopleLimit(), request.getPlace(), request.getAges());
        UserCalendar userCalendar = UserCalendar.createUserCalendar(calendarBoard.getCreater(), calendarBoard);

        userCalendarRepository.save(userCalendar); // 회원 일정 등록
        calendarBoardRepository.save(calendarBoard); // 일정 게시판에 일정 등록
    }

    // 일정 수정
    @Transactional
    public void updateCalendarBoard(User user, CalendarBoardRequest request, Long calendarId) {
        CalendarBoard calendarBoard = calendarBoardRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_CALENDAR_NOT_FOUND));

        if (user.getUserRole() != UserRole.ROLE_ADMIN && user.getUserId() != calendarBoard.getCreater().getUserId()) {
            // 일정 생성자이거나 관리자 권한일 때만 수정 가능
            throw new AuthenticationException("본인이 만든 일정만 수정 할 수 있습니다.");
        }

        calendarBoard.updateCalendarBoard(user, request.getCalendarContent(), request.getCalendarDatetime(), request.getPeopleLimit(), request.getPlace(), request.getAges());
    }

    // 일정 삭제
    @Transactional
    public void deleteCalendarBoard(User user, Long calendarId) {
        CalendarBoard calendarBoard = calendarBoardRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_CALENDAR_NOT_FOUND));

        if (user.getUserRole() != UserRole.ROLE_ADMIN && user.getUserId() != calendarBoard.getCreater().getUserId()) {
            // 일정 생성자이거나 관리자 권한일 때만 삭제 가능
            throw new AuthenticationException("본인이 만든 일정만 삭제 할 수 있습니다.");
        }

        userCalendarRepository.deleteByCalendarBoard(calendarBoard); // 해당 일정에 참가한 회원 일정 모두 삭제
        calendarBoardRepository.delete(calendarBoard); // 해당 일정 삭제
    }

    // 일정 참가
    @Transactional
    public void joinCalendar(User user, Long calendarId) {
        CalendarBoard calendarBoard = calendarBoardRepository.findById(calendarId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_CALENDAR_NOT_FOUND));

        if (userCalendarRepository.existsByUserAndCalendarBoard(user, calendarBoard)) {
            // 이미 참가한 일정이면 안됨
            throw new InvalidException("이미 참가한 일정입니다.");
        }

        if(userCalendarRepository.countByCalendarBoard(calendarBoard) >= calendarBoard.getPeopleLimit()){
            // 인원수 초과하면 안됨
            throw new InvalidException("참가 인원수를 초과하였습니다.");
        }

        UserCalendar userCalendar = UserCalendar.createUserCalendar(user, calendarBoard);
        userCalendarRepository.save(userCalendar);
    }

    // 일정 참가 취소
    @Transactional
    public void cancelCalendar(User user, Long userCalendarId) {
        UserCalendar userCalendar = userCalendarRepository.findById(userCalendarId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.BOARD_CALENDAR_NOT_FOUND));
        if (user.getUserRole() != UserRole.ROLE_ADMIN && user.getUserId() != userCalendar.getUser().getUserId()) {
            // 일정 참가자이거나 관리자 권한일 때만 삭제 가능
            throw new AuthenticationException("본인이 참여한 일정만 삭제 할 수 있습니다.");
        }

        userCalendarRepository.deleteById(userCalendarId);
    }

}
