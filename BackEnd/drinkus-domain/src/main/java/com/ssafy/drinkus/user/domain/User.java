package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 무분별한 객체 생성에 대해 한번 더 체크할 수 있는 수단
@AllArgsConstructor // 모든 생성자를 구현하는 annotation
@Getter // JPA에서 lombok @Setter는 거의 쓰지 않습니다
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    private String userId;

    private String userPw;

    private String userName;

    private String userNickname;

    private Integer userPopularity;

    private Integer userPopularityLimit; // 5 -> 0

    private LocalDate userBirthday;

    private String userIntroduce;

    private String userImg;

    private LocalDateTime userDeleteDate;

    @Enumerated(EnumType.STRING)
    private YN userDeleted; // Boolean type을 YN enum으로 사용

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private UserProvider userProvider;

    private int userPoint;

    private LocalDateTime userStopDate; // 정지기한 -> 추가기능

    private Integer userSoju;

    private Integer userBeer;

    private void defaultUserSettings() {
        userPopularity = 0;
        userPopularityLimit = 5;
        userNickname = String.valueOf(Math.random());
        userDeleted = YN.N;
        userPoint = 0;
        userSoju = 0;
        userBeer = 0;
    }

    // 로컬 회원가입
    // 이메일 비밀번호 이름 생년월일
    public static User createUser(String userId, String userPw, String userName, LocalDate userBirthday) {
        User user = new User();
        user.defaultUserSettings();
        user.userRole = UserRole.ROLE_USER;
        user.userProvider = UserProvider.local;
        user.userId = userId;
        user.userPw = userPw;
        user.userName = userName;
        user.userBirthday = userBirthday;
        return user;
    }

    // 소셜 회원가입
    public static User createUser(UserProvider userProvider, String userId, String userName) {
        User user = new User();
        user.defaultUserSettings();
        user.userRole = UserRole.ROLE_SOCIAL;
        user.userProvider = userProvider;
        user.userId = userId;
        user.userPw = "비밀번호임";
        user.userName = userName;
        return user;
    }

    // 회원수정
    // 닉네임 주량 자기소개
//    public void updateUser(String nickname) {
//        this.userNickname = nickname;
//    }

    //비밀번호 수정
    public void updateUser(String name) {
        this.userName = name;
    }
}
