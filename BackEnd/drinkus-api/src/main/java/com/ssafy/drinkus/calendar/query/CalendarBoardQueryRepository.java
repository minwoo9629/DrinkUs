package com.ssafy.drinkus.calendar.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.calendar.domain.QCalendarBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CalendarBoardQueryRepository {
    private final JPAQueryFactory queryFactory;

    private static QCalendarBoard qCalendarBoard = QCalendarBoard.calendarBoard;

    // 해당 월에 일정이 있는 날짜 리스트를 반환
    public List<LocalDateTime> getMonthlySchedule(LocalDateTime start, LocalDateTime end) {
        return queryFactory
                .select(qCalendarBoard.calendarDatetime)
                .distinct()
                .from(qCalendarBoard)
                .where(qCalendarBoard.calendarDatetime.between(start, end))
                .fetch();
    }
}
