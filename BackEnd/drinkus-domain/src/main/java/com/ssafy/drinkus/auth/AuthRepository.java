package com.ssafy.drinkus.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Auth a WHERE a.userId = :userId")
    void deleteByUserId(@Param("userId")long userId);
}
