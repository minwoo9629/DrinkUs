package com.ssafy.drinkus.calendar.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface CalendarBoardRepository extends JpaRepository<CalendarBoard,Long> {
}
