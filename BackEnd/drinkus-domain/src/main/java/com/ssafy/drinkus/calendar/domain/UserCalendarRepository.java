package com.ssafy.drinkus.calendar.domain;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCalendarRepository extends JpaRepository<UserCalendar,Long> {
    
    // 회원 일정 번호로 회원일정 삭제
    void deleteByCalendarBoard(CalendarBoard calendarBoard);

    // 회원번호와 일정번호로 회원일정이 있는지 확인
    Boolean existsByUserAndCalendarBoard(User user, CalendarBoard calendarBoard);

    // 회원번호와 일정번호로 회원일정 조회
    UserCalendar findByUserAndCalendarBoard(User user, CalendarBoard calendarBoard);

    // 해당 일정번호에 참여한 참가자 수가 몇 명인지 조회
    Long countByCalendarBoard(CalendarBoard calendarBoard);

}
