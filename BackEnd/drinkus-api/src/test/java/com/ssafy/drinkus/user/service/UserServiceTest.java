package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.auth.domain.AuthRepository;
import com.ssafy.drinkus.email.service.EmailService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static java.lang.Boolean.TRUE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthRepository authRepository;
    @Mock
    private BCryptPasswordEncoder passwordEncoder;
    @Mock
    private JwtUtil jwtUtil;
    @Mock
    private EmailService emailService;

    @Test
    @DisplayName("회원가입")
    void createUser() {
                given(userRepository.existsByUserName(any()))
                        .willReturn(TRUE);

    }

    @Test
    void loginUser() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void updatePassword() {
    }

    @Test
    void findByUserName() {
    }

    @Test
    void findByUserNickname() {
    }

    @Test
    void updatePopularity() {
    }

    @Test
    void findUserProfile() {
    }

    @Test
    void findUserMyInfo() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void findMyUserName() {
    }

    @Test
    void resetPw() {
    }

    @Test
    void sendEmailAuthEmail() {
    }

    @Test
    void confirmUserName() {
    }

    @Test
    void resetPopularityLimit() {
    }
}