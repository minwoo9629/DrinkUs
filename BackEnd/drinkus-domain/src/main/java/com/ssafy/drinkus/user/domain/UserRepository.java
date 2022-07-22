package com.ssafy.drinkus.user.domain;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUserId(String userId);

    // 인기도 limit 초기화
    @Modifying
    @Query(value = "UPDATE user SET user_popularity_limit = :limit", nativeQuery = true)
    Integer resetUserPopularityLimit(@Param("limit")int limit);

    //아이디로 회원 찾기
    Optional<User> findByUserId(String userId);

    //회원번호로 회원 찾기
    Optional<User> findByUserNo(Long userNo);

    //인기도 수정
    @Modifying
    @Query("update User set userPopularity = userPopularity + :popularNum where userNo = :userNo")
    Integer updatePopularity(@Param("userNo") Long userNo, @Param("popularNum") Integer popularNum);

}
