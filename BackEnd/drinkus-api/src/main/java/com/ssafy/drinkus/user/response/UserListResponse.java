package com.ssafy.drinkus.user.response;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListResponse {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userFullname;
    private String userNickname;
    private Integer userPopularity;
    private Integer userPopularityLimit;
    private String userBirthday;
    private String userIntroduce;
    private String userImg;
    private UserRole userRole;
    private String userGrade;
    private Long userPoint;
    private LocalDateTime userStopDate;
    private Integer userSoju;
    private Integer userBeer;

    public static UserListResponse from(User user){
        return new UserListResponse(
                user.getUserId(),
                user.getUserName(),
                user.getUserEmail(),
                user.getUserFullname(),
                user.getUserNickname(),
                user.getUserPopularity(),
                user.getUserPopularityLimit(),
                user.getUserBirthday(),
                user.getUserIntroduce(),
                user.getUserImg(),
                user.getUserRole(),
                user.getUserGrade(),
                user.getUserPoint(),
                user.getUserStopDate(),
                user.getUserSoju(),
                user.getUserBeer()
                );
    }
}
