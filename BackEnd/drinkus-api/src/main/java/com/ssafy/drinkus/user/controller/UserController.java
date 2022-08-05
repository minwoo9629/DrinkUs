package com.ssafy.drinkus.user.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.email.request.UserNameCheckRequest;
import com.ssafy.drinkus.security.request.TokenRequest;
import com.ssafy.drinkus.security.response.TokenResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.request.*;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import com.ssafy.drinkus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/join")
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequest request) throws IOException {
        userService.createUser(request);
        return ResponseEntity.ok().build();
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request) {
        TokenResponse token = userService.loginUser(request);
        String accessToken = token.getAccessToken();
        String refreshToken = token.getRefreshToken();
        return ResponseEntity.ok()
                .header("AccessToken", accessToken)
                .header("RefreshToken", refreshToken)
                .build();
    }

    // 리프레시 토큰 재발급
    @PostMapping("/refreshToken")
    public ResponseEntity<TokenResponse> reissueRefreshToken(@RequestBody @Valid TokenRequest request){
        TokenResponse token = userService.reissue(request);
        return ResponseEntity.ok().body(token);
    }

    //회원수정
    @PutMapping
    public ResponseEntity<Void> updateUser(@LoginUser Long userId,
                                           @RequestBody @Valid UserUpdateRequest request) {
        userService.updateUser(userId, request);
        return ResponseEntity.ok().build();
    }

    // 비밀번호 수정
    @PatchMapping("/pw")
    public ResponseEntity<Void> updatePassword(@LoginUser Long userId,
                                               @RequestBody @Valid UserUpdatePasswordRequest request) {
        userService.updatePassword(userId, request);
        return ResponseEntity.ok().build();
    }

    // 아이디 중복 검사
    @PostMapping("/join/id")
    public ResponseEntity<Void> findByUserId(@RequestBody @Valid UserDuplicateCheckIdRequest request) {
        userService.findByUserName(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 닉네임 중복 검사
    @GetMapping("/nickname")
    public ResponseEntity<Void> findByUserNickname(@RequestBody @Valid UserDuplicateCheckNicknameRequest request){
        userService.findByUserNickname(request.getUserNickname());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 인기도 수정
    @PatchMapping("/popularity")
    public ResponseEntity<Void> updatePopularity(@LoginUser Long userId, @RequestBody UserPopularityRequest request) {
        userService.updatePopularity(userId, request.getPopularNum());
        return ResponseEntity.ok().build();
    }

    // 프로필 조회
    @GetMapping("/profile/{user_id}")
    public ResponseEntity<UserProfileResponse> findUserProfile(@PathVariable("user_id") Long userId) {
        UserProfileResponse body = userService.findUserProfile(userId);
        return ResponseEntity.ok().body(body);
    }

    // 내정보 조회
    @GetMapping("")
    public ResponseEntity<UserMyInfoResponse> findUserMyInfo(@LoginUser User user) {
        UserMyInfoResponse body = userService.findUserMyInfo(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    // 회원 탈퇴 (회원 삭제)
    @PutMapping("/delete")
    public ResponseEntity<Void> deleteUser(@LoginUser Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    // 아이디 찾기
    @PostMapping("/id")
    public ResponseEntity<List<String>> findMyUserName(@RequestBody @Valid UserFindMyIdRequest request) {
        List<String> body = userService.findMyUserName(request);
        return ResponseEntity.ok().body(body);
    }

    // 비밀번호 재설정 및 이메일 발송
    @PostMapping("/pw")
    public ResponseEntity<Void> findMyPw(@RequestBody @Valid UserFindMyPwRequest request) {
        userService.resetPw(request);
        return ResponseEntity.ok().build();
    }

    // 회원가입 이메일 인증 발송
    @PostMapping("/sendConfirmEmail")
    public ResponseEntity<Void> sendUserNameCheckEmail(@RequestBody @Valid UserNameCheckRequest request) throws MessagingException {
        userService.sendEmailAuthEmail(request);
        return ResponseEntity.ok().build();
    }

    // 이메일 토큰 인증 확인
    @PatchMapping("/confirmToken")
    public ResponseEntity<Void> confirmUserNameCheck(@RequestBody @Valid UserNameAuthRequest request){
        userService.confirmUserName(request);
        return ResponseEntity.ok().build();
    }
}
