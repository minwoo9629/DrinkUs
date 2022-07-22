package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.UserCreateRequest;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import com.ssafy.drinkus.user.request.UserUpdatePasswordRequest;
import com.ssafy.drinkus.user.request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    private final AuthenticationManager authenticationManager;

    @Transactional
    public void createUser(UserCreateRequest request) {
        if (userRepository.existsByUserId(request.getUserId())) {
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
        User user = User.createUser(request.getUserId(), passwordEncoder.encode(request.getUserPw()), request.getUserName(), request.getUserBirthday());

        userRepository.save(user);
    }

    public String loginUser(UserLoginRequest request) {

        User findUser = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        if(!passwordEncoder.matches(request.getUserPw(), findUser.getUserPw())){
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        // 전달받은 request를 가지고 authentication 생성
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserId(), request.getUserPw()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtil.createToken(authentication);

        return token;
    }

    //회원수정
    @Transactional
    public void updateUser(UserUpdateRequest request, User user) {

        User findUser = userRepository.findById(user.getUserNo())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        findUser.updateUser(request.getUserName());
    }

    //비밀번호 수정
    @Transactional
    public void updatePassword(UserUpdatePasswordRequest request) {
        //회원번호로 회원 조회
        User findUser = userRepository.findByUserNo(request.getUserNo())
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
    public void findByUserId(String id){
        if(userRepository.findByUserId(id).isPresent()){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
    }
}
