package com.ssafy.drinkus.room.domain;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoomHistoryRepository extends JpaRepository<RoomHistory,Long> {

    // 현재 방에 존재하는 사람 수
    @Query(value = "select count(rh) from RoomHistory rh where rh.createdDate = rh.modifiedDate and rh.room.roomId = :roomId")
    Integer countPeopleInRoom(@Param("roomId") Long roomId);
    
    Optional<RoomHistory> findTopByRoomRoomIdAndUserUserId(Long roomId, Long userId);

    // 유저가 현재 다른 방에 접속중인지 확인
    Optional<RoomHistory> findTopByUserUserIdAndIsExited(Long userId, YN isExited);
}
