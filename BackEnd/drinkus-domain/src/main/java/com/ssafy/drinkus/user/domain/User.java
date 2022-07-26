package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.RoomHistory;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 무분별한 객체 생성에 대해 한번 더 체크할 수 있는 수단
@AllArgsConstructor // 모든 생성자를 구현하는 annotation
@Getter // JPA에서 lombok @Setter는 거의 쓰지 않습니다
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private String userName;

    private String userEmail;

    private String userPw;

    private String userFullname;

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

    private String userProviderId;

    private Long userPoint;

    private LocalDateTime userStopDate; // 정지기한 -> 추가기능

    private Integer userSoju;

    private Integer userBeer;

    @OneToMany(mappedBy = "user")
    private List<RoomHistory> roomHistories = new ArrayList<>();

    private void defaultUserSettings() {
        userPopularity = 0;
        userPopularityLimit = 5;
        userNickname = String.valueOf(Math.random());
        userDeleted = YN.N;
        userPoint = 0L;
        userSoju = 0;
        userBeer = 0;
    }

    // 로컬 회원가입
    // 이메일 비밀번호 이름 생년월일
    public static User createUser(String userName, String userPw, String userFullname, LocalDate userBirthday, String userEmail) {
        User user = new User();
        user.defaultUserSettings();
        user.userRole = UserRole.ROLE_USER;
        user.userProvider = UserProvider.local;

        user.userName = userName;
        user.userEmail = userEmail;
        user.userPw = userPw;
        user.userFullname = userFullname;
        user.userBirthday = userBirthday;
        return user;
    }

    // 소셜 회원가입
    public static User createUser(UserProvider userProvider, String userProviderId, String userName, String userEmail) {
        User user = new User();
        user.defaultUserSettings();
        user.userRole = UserRole.ROLE_SOCIAL;
        user.userPw = "비밀번호임";

        user.userProvider = userProvider;
        user.userProviderId = userProviderId;
        user.userName = userName;
        user.userEmail = userEmail;
        return user;
    }

    // 회원수정
    // 닉네임 주량 자기소개
    public void updateUser(String userNickname, String userIntroduce, Integer userSoju, Integer userBeer, String userImg) {
        this.userNickname = userNickname;
        this.userIntroduce = userIntroduce;
        this.userSoju = userSoju;
        this.userBeer = userBeer;
        this.userImg = userImg;
    }

    //비밀번호 수정
    public void updateUserPassword(String userPw) {
        this.userPw = userPw;
    }

    // 회원 비활성화
    public void disableUser() {
        this.userDeleted = YN.Y;
        this.userDeleteDate = LocalDateTime.now();
    }

    //인기도 수정
    public void updatePopularity(Integer popularNum){
        this.userPopularity += popularNum;
    }
}
