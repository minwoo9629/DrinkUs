package com.ssafy.drinkus.user.domain;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUserName(String userName);

    // 인기도 limit 초기화
    @Modifying
    @Query("UPDATE User u SET u.userPopularityLimit = :limit")
    Integer resetUserPopularityLimit(@Param("limit")int limit);

    //아이디로 회원 찾기
    Optional<User> findByUserName(String userName);

    //회원번호로 회원 찾기
    Optional<User> findByUserId(Long userId);

    // 본명과 생년월일에 해당하는 유저 아이디 리스트 조회
    //@Query("SELECT u FROM User u WHERE u.userFullname = :userFullName AND u.userBirthday = :userBirthday")
    //Optional<List<String>> findByUserFullnameAndUserBirthday(@Param("userFullName") String userFullname, @Param("userBirthday") LocalDate userBirthday);
    List<User> findByUserFullnameAndUserBirthday(String userFullName, LocalDate userBirthday);

}
