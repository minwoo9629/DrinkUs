package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.*;
import com.ssafy.drinkus.common.type.TokenType;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.email.request.UserNameCheckRequest;
import com.ssafy.drinkus.email.service.EmailService;
import com.ssafy.drinkus.email_auth.EmailAuth;
import com.ssafy.drinkus.auth.Auth;
import com.ssafy.drinkus.auth.AuthRepository;
import com.ssafy.drinkus.security.request.TokenRequest;
import com.ssafy.drinkus.security.response.TokenResponse;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.*;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    final int PASSWORD_SIZE = 15;
    final int WAITING_DAYS = 7;
    final int POPULARITY_LIMIT = 5;

    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;


    @Transactional
    public void createUser(UserCreateRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
        User user = User.createUser(request.getUserName(), passwordEncoder.encode(request.getUserPw()), request.getUserFullname(), request.getUserBirthday(), request.getUserName());
        userRepository.save(user);
    }

    @Transactional
    public TokenResponse loginUser(UserLoginRequest request) {
        User findUser = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        if (!passwordEncoder.matches(request.getUserPw(), findUser.getUserPw())) {
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        // 이전에 존재하던 RefreshToken들 모두 삭제
        authRepository.deleteByUserId(findUser.getUserId());

        // AccessToken, RefreshToken 발급
        String accesstoken = jwtUtil.createToken(findUser.getUserId(), TokenType.ACCESS_TOKEN);
        String refreshToken = jwtUtil.createToken(findUser.getUserId(), TokenType.REFRESH_TOKEN);

        // RefreshToken 저장
        Auth auth = Auth.builder()
                .userId(findUser.getUserId())
                .refreshToken(refreshToken)
                .build();
        authRepository.save(auth);
        return new TokenResponse(accesstoken, refreshToken);
    }

    @Transactional
    public TokenResponse reissue(TokenRequest request){
        // 만료된 refresh token 에러
        if(!jwtUtil.isValidToken(request.getRefreshToken())){
            throw new RefreshTokenException("리프레시 토큰이 만료되었습니다.");
        }

        // AccessToken에서 user pk 가져오기
        String accessToken = request.getAccessToken();
        Authentication authentication = jwtUtil.getAuthentication(accessToken);

        // user pk로 유저 검색 / repository에 저장된 RefreshToken이 없음
        User findUser = userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        Auth auth = authRepository.findByUserId(findUser.getUserId())
                .orElseThrow(() -> new RefreshTokenException("리프레시 토큰이 없습니다."));

        // 리프레시 토큰 불일치 에러
        if(!auth.getRefreshToken().equals(request.getRefreshToken()))
            throw new RefreshTokenException("리프레시 토큰이 일치하지 않습니다.");

        // AccessToken, RefreshToken 재발급, 리프레시 토큰 저장
        TokenResponse newCreatedToken = new TokenResponse(
                jwtUtil.createToken(findUser.getUserId(), TokenType.ACCESS_TOKEN),
                jwtUtil.createToken(findUser.getUserId(), TokenType.REFRESH_TOKEN)
        );
        Auth updateAuth = auth.updateRefreshToken(newCreatedToken.getRefreshToken());
        authRepository.save(updateAuth);

        return newCreatedToken;
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
        if (!passwordEncoder.matches(request.getUserBeforePw(), findUser.getUserPw())) {
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        //새 비밀번호 == 새 비밀번호 확인
        if (!request.getUserPw().equals(request.getUserCheckPw())) {
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        findUser.updateUserPassword(passwordEncoder.encode(request.getUserPw()));
    }

    //아이디 찾기
    public void findByUserName(String userName) {
        if (userRepository.existsByUserName(userName)) {
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
    }

    // 닉네임 중복 검사
    public void findByUserNickname(String userNickname){
        if(userRepository.existsByUserNickname(userNickname)){
            throw new DuplicateException("이미 존재하는 닉네임입니다.");
        }
    }

    //인기도 수정
    @Transactional
    public void updatePopularity(Long userId, Integer popularNum) {
        // 회원번호 회원을 조회 -> 인기도를 get한다.
        User findUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        // 인기도의 수정 값만 바꿔준다
        findUser.updatePopularity(popularNum);
    }

    // 회원 프로필 조회
    public UserProfileResponse findUserProfile(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserProfileResponse.from(user);
    }

    // 회원 내정보 조회
    public UserMyInfoResponse findUserMyInfo(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserMyInfoResponse.from(user);
    }

    // 회원 탈퇴 (삭제 대기)
    @Transactional
    public void disableUser(Long userId){
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        findUser.disableUser();
    }

    // 아이디 찾기
    public List<String> findMyUserName(UserFindMyIdRequest request){
        List<User> findUsers = userRepository.findByUserFullnameAndUserBirthday(request.getUserFullname(), request.getUserBirthday());
        List<String> newUserNameList = new ArrayList<>();

        for(User user : findUsers){
            int nameLen = user.getUserName().indexOf("@");
            int halfNameLen = (nameLen / 2) + 1;

            StringBuilder sb = new StringBuilder(user.getUserName());
            for(int i = halfNameLen ; i < nameLen ; i++){
                sb.setCharAt(i, '*');
            }
            newUserNameList.add(sb.toString());
        }
        return newUserNameList;
    }

    // 비밀번호 재설정 및 이메일 발송
    @Transactional
    public void resetPw(UserFindMyPwRequest request) {
        User findUser = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        String password = makeNewPassword();
        findUser.updateUserPassword(passwordEncoder.encode(password));

        // 이메일 발송
        try {
            emailService.sendResetPwEmail(request.getUserName(), password);
        } catch (MessagingException e) {
            throw new MailSendFailException(MailSendFailException.MAIL_SEND_FAIL);
        }
    }

    // 회원가입 이메일 인증 토큰 생성 및 발송
    @Transactional
    public void sendEmailAuthEmail(UserNameCheckRequest request) {
        if (userRepository.existsByUserName(request.getUserName())){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }

        EmailAuth emailAuth = EmailAuth.createEmailAuth(request.getUserName(), UUID.randomUUID().toString());
        emailService.saveEmailAuth(emailAuth);
        try{
            emailService.sendUserNameCheckEmail(emailAuth.getUserName(), emailAuth.getAuthToken());
        }catch (MessagingException e){
            throw new MailSendFailException(MailSendFailException.MAIL_SEND_FAIL);
        }
    }

    // 회원가입 이메일 인증 토큰 확인
    @Transactional
    public void confirmUserName(UserNameAuthRequest request){
        emailService.confirmEmailAuth(request);
    }

    // 비밀번호 랜덤 재생성
    public String makeNewPassword(){
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        StringBuilder sb = new StringBuilder();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        for(int i = 0 ; i < PASSWORD_SIZE ; i++){
            idx = sr.nextInt(charSet.length);
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    // 닉네임 랜덤 생성
    public String makeRandomNickname() throws IOException {
        URL url = new URL("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=10&whitespace=_");

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(3000);

        BufferedReader rd;
        if(conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();

        return null;
    }

    // 회원 삭제 스케줄 task
    @Scheduled(cron = "0 0 6 * * *") // 매일 6시 정각
    @Transactional
    public void deleteUser(){
        List<User> userList = userRepository.findAll();

        for(User user : userList){
            LocalDateTime disableDate = user.getUserDeleteDate();
            LocalDateTime todayDate = LocalDateTime.now();
            if(user.getUserDeleted() == YN.Y && todayDate.isAfter(disableDate.plusDays(WAITING_DAYS))){
                userRepository.delete(user);
            }
        }
    }

    // 인기도 제한 초기화 스케줄 task
    @Scheduled(cron = "0 0 6 * * *") // 매일 6시 정각
    @Transactional
    public void resetPopularityLimit(){
        userRepository.resetUserPopularityLimit(POPULARITY_LIMIT);
    }

    public UserMyInfoResponse test(User user){
        UserMyInfoResponse response = new UserMyInfoResponse(
                user.getUserName(),
                user.getUserNickname(),
                user.getUserPopularity(),
                user.getUserBirthday(),
                user.getUserIntroduce(),
                user.getUserImg(),
                user.getUserRole(),
                user.getUserPoint(),
                user.getUserSoju(),
                user.getUserBeer()
        );

        return response;
    }
}
