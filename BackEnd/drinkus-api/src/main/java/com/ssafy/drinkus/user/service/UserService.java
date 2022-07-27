package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.MailSendFailException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.email.dto.EmailDto;
import com.ssafy.drinkus.email.handler.MailHandler;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.*;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    @Value("${spring.mail.username}")
    private String sender;
    final int PASSWORD_SIZE = 15;
    final int WAITING_DAYS = 7;
    final int POPULARITY_LIMIT = 5;

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;


    @Transactional
    public void createUser(UserCreateRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new DuplicateException("이미 가입된 회원입니다.");
        }
        User user = User.createUser(request.getUserName(), passwordEncoder.encode(request.getUserPw()), request.getUserFullname(), request.getUserBirthday(), request.getUserName());
        userRepository.save(user);
    }

    public String loginUser(UserLoginRequest request) {
        User findUser = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        if (!passwordEncoder.matches(request.getUserPw(), findUser.getUserPw())) {
            // 예외 던짐 -> 캐치하는곳 필요
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(findUser.getUserId());
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
            sendMail(request.getUserName(), password);
        } catch (MessagingException e) {
            throw new MailSendFailException(MailSendFailException.MAIL_SEND_FAIL);
        }
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

    public void sendMail(String receiver, String password) throws MailSendFailException, MessagingException {
        // 이메일 발송 정보 설정
        EmailDto mailDto = new EmailDto();
        mailDto.setFromAddress(sender);
        mailDto.setTitle("[DrinkUs] 비밀번호 재설정 안내입니다.");
        StringBuilder content = new StringBuilder();
        content.append("<div class='container' align='left'>");
        content.append("    <div>안녕하세요, DrinkUs입니다.</div>");
        content.append("    <div>고객님의 비밀번호를 재설정하여 다음과 같이 알려드립니다.</div><br>");
        content.append("    <div>비밀번호 : <strong style='background-color: yellow;'>" + password +  "</strong></div><br>");
        content.append("    <div>안내된 비밀번호로 로그인 후 비밀번호 재설정 바랍니다.</div>");
        content.append("</div>");
        mailDto.setContent(content.toString());
        mailDto.addToAddress(receiver);

        // 메일 발송
        MailHandler mailHandler = new MailHandler(mailSender);
        mailHandler.setFrom(mailDto.getFromAddress());
        mailHandler.setTo(mailDto.getToAddressList());
        mailHandler.setSubject(mailDto.getTitle());
        mailHandler.setText(mailDto.getContent(), true);
        mailHandler.send();
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
                user.getUserPoint(),
                user.getUserSoju(),
                user.getUserBeer()
        );

        return response;
    }
}
