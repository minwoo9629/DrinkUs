package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//        findUser.disableUser();

//        public void disableUser() {
//            this.userDeleted = YN.Y;
//            this.deleteDate = LocalDateTime.now();
//        }

    }

    @Transactional
    public void deleteUser(Long userNo){
        User findUser = userRepository.findById(userNo)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        userRepository.delete(findUser);
    }
}
