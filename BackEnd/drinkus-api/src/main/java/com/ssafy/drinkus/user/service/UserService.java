package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.UserCreateRequest;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import com.ssafy.drinkus.user.request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @Transactional
    public void createUser(UserCreateRequest request) {
        if(userRepository.findByUserEmail(request.getEmail()).isPresent()){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }

        User user = User.createUser(request.getEmail(), passwordEncoder.encode(request.getPw()), request.getName());
        userRepository.save(user);
    }

    public String loginUser(UserLoginRequest request) {

        User findUser = userRepository.findByUserEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        if(!passwordEncoder.matches(request.getPw(), findUser.getUserPw())){
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(findUser.getId());
    }

    @Transactional
    public void updateUser(UserUpdateRequest request, User user) {

        User findUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        findUser.updateUser(request.getName());
    }
}
