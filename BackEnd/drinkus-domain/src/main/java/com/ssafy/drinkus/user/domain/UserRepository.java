package com.ssafy.drinkus.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUserName(String userName);

    Boolean existsByUserNickname(String userNickname);

    // 인기도 limit 초기화
    @Modifying
    @Query("UPDATE User u SET u.userPopularityLimit = :limit")
    Integer resetUserPopularityLimit(@Param("limit")int limit);

    // 아이디로 사용자 찾기
    Optional<User> findByUserName(String userName);

    // 본명과 생년월일에 해당하는 사용자 아이디 리스트 조회
    List<User> findByUserFullnameAndUserBirthday(String userFullName, String userBirthday);

    // 사용자 이용정지기한 설정
    @Modifying
    @Query("UPDATE User u SET u.userStopDate = :userStopDate WHERE u.userId = :userId")
    Integer updateUserStopDate(@Param("userStopDate")LocalDateTime userStopDate, @Param("userId")Long userId);
}
