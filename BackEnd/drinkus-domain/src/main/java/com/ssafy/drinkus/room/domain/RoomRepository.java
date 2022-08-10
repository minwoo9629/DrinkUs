package com.ssafy.drinkus.room.domain;

import com.ssafy.drinkus.common.type.YN;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room,Long> {
    
    // 기본 방리스트의 방정보 반환형
    @Query("select r.roomId, r.roomName, r.createdDate, r.peopleLimit, r.placeTheme from Room as r")
    Optional<List<Room>> findRoomList();

    // 같은 나잇대의 방
    Optional<List<Room>> findAllByAges20(YN ages20);
    Optional<List<Room>> findAllByAges30(YN ages30);
    Optional<List<Room>> findAllByAges40(YN ages40);
    Optional<List<Room>> findAllByAges50(YN ages50);
    Optional<List<Room>> findAllByAges60(YN ages60);
    Optional<List<Room>> findAllByAges70(YN ages70);

    // 1시간 이내 생성된 방
    Optional<List<Room>> findAllByCreatedDateAfter(LocalDateTime createdDate);

    // 방 존재여부
    Boolean existsByRoomId(Long roomId);


}
