package com.ssafy.drinkus.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    Optional<User> findByUserNo(Long userNo);

    Boolean existsByUserId(String userId);
}
