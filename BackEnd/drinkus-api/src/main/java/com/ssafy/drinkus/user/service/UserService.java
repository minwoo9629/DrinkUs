package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.UserCreateRequest;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import com.ssafy.drinkus.user.request.UserUpdatePasswordRequest;
import com.ssafy.drinkus.user.request.UserUpdateRequest;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    @Transactional
    public void createUser(UserCreateRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
        User user = User.createUser(request.getUserName(), passwordEncoder.encode(request.getUserPw()), request.getUserBirthday(), request.getUserName());
        userRepository.save(user);
    }

    public String loginUser(UserLoginRequest request) {
        System.out.println("UserService.loginUser");
        User findUser = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        System.out.println("유저 찾음");
        if(!passwordEncoder.matches(request.getUserPw(), findUser.getUserPw())){
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        // 전달받은 request를 가지고 authentication 생성
        // 현재 여기에서 에러 나는 중
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getUserPw()));
//        System.out.println("authentication 객체 생성 완료");
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        System.out.println("스레드에등록");
//        String token = jwtUtil.createToken(authentication);
//        System.out.println("토큰 생성 완료");

        String token = jwtUtil.createToken(findUser.getUserId());
        return token;
    }

    //회원수정
    @Transactional
    public void updateUser(Long userId, UserUpdateRequest request) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        findUser.updateUser(request.getUserNickname(), request.getUserIntroduce(), request.getUserSoju(), request.getUserBeer(), request.getUserImg());
    }

    //비밀번호 수정
    @Transactional
    public void updatePassword(Long userId, UserUpdatePasswordRequest request) {
        //회원번호로 회원 조회
        User findUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        //이전 비밀번호 같은 지 확인
        if(!passwordEncoder.matches(request.getUserBeforePw(), findUser.getUserPw())){
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        //새 비밀번호 == 새 비밀번호 확인
        if(!request.getUserPw().equals(request.getUserCheckPw())){
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        findUser.updateUserPassword(passwordEncoder.encode(request.getUserPw()));
    }

    //아이디 찾기
    public void findByUserName(String userName){
        if(userRepository.existsByUserName(userName)){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
    }

    //인기도 수정
    @Transactional
    public void updatePopularity(Long userId, Integer popularNum){
        userRepository.updatePopularity(userId,popularNum);
    }

}
