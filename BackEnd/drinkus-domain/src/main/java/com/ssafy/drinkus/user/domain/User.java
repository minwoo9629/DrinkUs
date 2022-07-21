package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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

    private String userEmail;

    private String userPw;

    private String userName;

    private String userNickname;

    private Integer userPopularity;

    private Integer userPopularityLimit; // 5 -> 0

    private LocalDate userBirthday;

    private String userIntroduce;

    private String userImg;

    private LocalDateTime createdDate;

    private LocalDateTime userDeleteDate;

    @Enumerated(EnumType.STRING)
    private YN userDeleted; // Boolean type을 YN enum으로 사용

    @Enumerated(EnumType.STRING)
    private UserRole userRole; // ROLE_USER와 ROLE_ADMIN형식

    private String userProvider; // 제공자 -> 추가기능

    private String userProviderId; // 제공자ID -> 추가기능

    private Long userPoint; // 포인트 -> 추가기능

    private LocalDateTime userStopDate; // 정지기한 -> 추가기능

    private Integer userSoju;

    private Integer userBeer;

    // 회원가입
    // 이메일 비밀번호 이름 생년월일
    public static User createUser(String email, String pw, String name){
        User user = new User();
        user.userEmail = email;
        user.userPw = pw;
        user.userName = name;
        user.userRole = UserRole.ROLE_USER;
        user.userPopularityLimit = 5;
        return user;
    }

    // 회원수정
    // 닉네임 주량 자기소개
//    public void updateUser(String nickname) {
//        this.userNickname = nickname;
//    }

    //비밀번호 수정
    public void updateUser(String name ) {
        this.userName = name;
    }
}
