package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceTemp {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional(readOnly = true)
    public UserResponse findUserById(Long userNo){
        User user = userRepository.findById(userNo).orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        //System.out.println(user.getUserName());
        return UserResponse.of(user);
    }

    @Transactional
    public void disableUser(Long userNo){
        User findUser = userRepository.findById(userNo)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        findUser.disableUser();

//        public void disableUser() {
//            this.userDeleted = YN.Y;
//            this.deleteDate = LocalDateTime.now();
//        }
    }

    @Scheduled(cron = "0 0 5 * * *")
    @Transactional
    public void deleteUser(){
        // 1. user_no 값 중 최대값을 받아온다.
        Long maxUserNo = userRepository.findMaxUserNo();
        System.out.println(maxUserNo);
        // 2. 1 ~ 최대user_no 반복문을 돌면서 유저 검사
        // 3. not found면 다음, 찾으면 disable_date + 7일 인지 확인
        // 4. 맞으면 삭제

//        User findUser = userRepository.findById(userNo)
//                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
//        userRepository.delete(findUser);
    }

    @Scheduled(cron = "0 0 6 * * *")
    @Transactional
    public void resetPopularityLimit(){

    }
}
