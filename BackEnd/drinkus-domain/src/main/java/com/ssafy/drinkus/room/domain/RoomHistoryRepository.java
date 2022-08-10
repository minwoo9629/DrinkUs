package com.ssafy.drinkus.room.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomHistoryRepository extends JpaRepository<RoomHistory,Long> {

    // 현재 방에 존재하는 사람 수
    @Query(value = "select count(rh) from RoomHistory rh where rh.createdDate = rh.modifiedDate and rh.room.roomId = :roomId")
    Integer countPeopleInRoom(@Param("roomId") Long roomId);

}
