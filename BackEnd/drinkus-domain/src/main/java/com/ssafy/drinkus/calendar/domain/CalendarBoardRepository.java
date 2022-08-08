package com.ssafy.drinkus.calendar.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarBoardRepository extends JpaRepository<CalendarBoard,Long> {
    List<CalendarBoard> findByCalendarDatetimeBetween(LocalDateTime start, LocalDateTime end, Pageable page);

    Long countByCalendarDatetimeBetween(LocalDateTime start, LocalDateTime end);
}
