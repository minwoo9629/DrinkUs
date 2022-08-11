package com.ssafy.drinkus.room.domain;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoomHistoryRepository extends JpaRepository<RoomHistory,Long> {

    // 현재 방에 존재하는 사람 수
    @Query(value = "select count(rh) from RoomHistory rh where rh.createdDate = rh.modifiedDate and rh.room.roomId = :roomId")
    Integer countPeopleInRoom(@Param("roomId") Long roomId);

    // 유저의 방 현재 접속 여부 파악
//    @Query("select rh.roomHistoryId, rh.createdDate, rh.modifiedDate, rh.room, rh.user " +
//            "from RoomHistory rh " +
//            "where rh.room.roomId = :roomId and rh.user.userId = :userId " +
//            "and rh.createdDate = rh.modifiedDate")
//    Optional<RoomHistory> findByRoomAndUser(@Param("roomId") Long roomId, @Param("userId") Long userId);
    Optional<RoomHistory> findByRoomRoomIdAndUserUserId(Long roomId, Long userId);
}
