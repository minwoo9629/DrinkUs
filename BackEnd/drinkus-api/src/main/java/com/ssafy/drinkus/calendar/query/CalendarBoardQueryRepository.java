package com.ssafy.drinkus.calendar.query;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.calendar.domain.CalendarBoard;
import com.ssafy.drinkus.calendar.domain.QCalendarBoard;
import com.ssafy.drinkus.calendar.domain.QUserCalendar;
import com.ssafy.drinkus.calendar.response.MyCalendarResponse;
import com.ssafy.drinkus.common.NotExistException;
import com.ssafy.drinkus.user.domain.QUser;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.drinkus.calendar.domain.QCalendarBoard.calendarBoard;
import static com.ssafy.drinkus.user.domain.QUser.user;

@Repository
@RequiredArgsConstructor
public class CalendarBoardQueryRepository {
    private final JPAQueryFactory queryFactory;

    private static QCalendarBoard qCalendarBoard = calendarBoard;
    private static QUserCalendar qUserCalendar = QUserCalendar.userCalendar;

    // 해당 월에 일정이 있는 날짜 리스트를 반환
    public List<LocalDateTime> findMonthlySchedule(LocalDateTime start, LocalDateTime end) {
        return queryFactory
                .select(qCalendarBoard.calendarDatetime)
                .distinct()
                .from(qCalendarBoard)
                .where(qCalendarBoard.calendarDatetime.between(start, end))
                .fetch();
    }

    // 해당 회원의 일정 리스트를 반환
    public Page<MyCalendarResponse> findByUser(User user, Pageable page){
        List<CalendarBoard> results = queryFactory
                .selectFrom(qCalendarBoard)
                .leftJoin(qUserCalendar)
                .on(qCalendarBoard.calendarId.eq(qUserCalendar.calendarBoard.calendarId))
                .where(qUserCalendar.user.userId.eq(user.getUserId()))
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch();

        if(results.size() == 0){
            throw new NotExistException("아직 내 일정이 없습니다.");
        }

        List<MyCalendarResponse> response = new ArrayList<>();
        for(CalendarBoard calendarBoard: results){
            response.add(MyCalendarResponse.from(calendarBoard));
        }

        Long tot = queryFactory
                .selectFrom(qCalendarBoard)
                .leftJoin(qUserCalendar)
                .on(qCalendarBoard.calendarId.eq(qUserCalendar.calendarBoard.calendarId))
                .where(qUserCalendar.user.userId.eq(user.getUserId()))
                .fetchCount();

        return new PageImpl<>(response, page, tot);
    }

    public Optional<CalendarBoard> findCalenderAndUserById(Long calendarId){
        CalendarBoard calendarBoard = queryFactory
                .selectFrom(QCalendarBoard.calendarBoard)
                .join(QCalendarBoard.calendarBoard.creater, user).fetchJoin()
                .where(QCalendarBoard.calendarBoard.calendarId.eq(calendarId))
                .fetchOne();
        return Optional.ofNullable(calendarBoard);
    }
}
