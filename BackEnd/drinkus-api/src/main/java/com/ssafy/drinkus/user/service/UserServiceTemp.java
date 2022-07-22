package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceTemp {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional(readOnly = true)
    public UserProfileResponse findUserProfile(Long userNo){
        User user = userRepository.findById(userNo).orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserProfileResponse.from(user);
    }

    @Transactional(readOnly = true)
    public UserMyInfoResponse findUserMyInfo(Long userNo){
        User user = userRepository.findById(userNo).orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserMyInfoResponse.from(user);
    }

    @Transactional
    public void disableUser(Long userNo){
        User findUser = userRepository.findById(userNo)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        findUser.disableUser();
    }

    // 전체 유저 대상, disableDate + 7일 인지 확인, 맞으면 DB에서 삭제
    @Scheduled(cron = "0 0 6 * * *") // 매일 6시 정각
    @Transactional
    public void deleteUser(){
        final int WAITING_DAYS = 7;
        List<User> userList = userRepository.findAll();

        for(User user : userList){
            LocalDateTime disableDate = user.getUserDeleteDate();
            LocalDateTime todayDate = LocalDateTime.now();
            if(user.getUserDeleted().equals(YN.Y) && todayDate.isAfter(disableDate.plusDays(WAITING_DAYS))){
                userRepository.delete(user);
            }
        }
    }

    @Scheduled(cron = "0 0 12 * * *") // 매일 12시 정각
    @Transactional
    public void resetPopularityLimit(){
        final int POPULARITY_LIMIT = 5;
        userRepository.resetUserPopularityLimit(POPULARITY_LIMIT);
    }
}
