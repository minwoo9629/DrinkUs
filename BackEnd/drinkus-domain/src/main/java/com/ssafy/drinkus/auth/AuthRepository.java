package com.ssafy.drinkus.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUserId(Long userId);
}
