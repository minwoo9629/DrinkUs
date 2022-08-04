package com.ssafy.drinkus.room.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query(value = "SELECT max(u.user_id) FROM user u")
    Long findMaxId();

    boolean existsByName(String roomName);
}
