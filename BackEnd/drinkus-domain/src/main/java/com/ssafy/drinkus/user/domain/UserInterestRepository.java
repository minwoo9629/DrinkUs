package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.interest.domain.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {
    List<UserInterest> findByUser(Long userId);

    Optional<UserInterest> findByUserAndInterest(User user, Interest interest);
}
