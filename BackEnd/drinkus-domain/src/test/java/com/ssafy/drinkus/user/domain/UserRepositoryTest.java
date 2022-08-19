package com.ssafy.drinkus.user.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void existsByUserName() {
    }

    @Test
    void existsByUserNickname() {
    }

    @Test
    void resetUserPopularityLimit() {
    }

    @Test
    void findByUserName() {
    }

    @Test
    void findByUserFullnameAndUserBirthday() {
    }

    @Test
    void updateUserStopDate() {
    }

    @Test
    void updateUserRole() {
    }
}