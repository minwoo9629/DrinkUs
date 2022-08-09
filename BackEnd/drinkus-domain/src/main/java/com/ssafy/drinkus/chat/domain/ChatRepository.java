package com.ssafy.drinkus.chat.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findTopByRoomIdOrderByCreatedAtDesc(Long roomId);

    List<Chat> findAllByRoomIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(Long roomId, LocalDateTime createdAt, Pageable pageable);
}
