package com.ssafy.drinkus.emailauth.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

    Optional<EmailAuth> findByUserNameAndAuthTokenAndExpireDateAfter(String userName, String authToken, LocalDateTime currentTime);
}
