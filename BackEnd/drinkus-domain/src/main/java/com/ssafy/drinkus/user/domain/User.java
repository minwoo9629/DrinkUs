package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String userEmail;

    private String userPw;

    private String userName;

    private String userNickname;

    private int userPopularity;

    private int userPopularityLimit; // 5 -> 0

    private LocalDate userBirthday;

    private LocalDateTime userDeleteDate;

    @Enumerated(EnumType.STRING)
    private YN userDeletedYn;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    
    private String userImg;
    
    private String userProvider;
    
    private String userProviderId;
    
    private int userPoint;

    public static User createUser(String email, String pw, String name){
        User user = new User();
        user.userEmail = email;
        user.userPw = pw;
        user.userName = name;
        user.userRole = UserRole.ROLE_USER;
        return user;
    }

    public void updateUser(String name) {
        this.userName = name;
    }
}
