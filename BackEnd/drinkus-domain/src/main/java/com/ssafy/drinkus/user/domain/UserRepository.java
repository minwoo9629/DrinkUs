package com.ssafy.drinkus.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserEmail(String userEmail);

    @Query(value = "SELECT MAX(USER_NO) FROM USER", nativeQuery = true)
    Long findMaxUserNo();
}
