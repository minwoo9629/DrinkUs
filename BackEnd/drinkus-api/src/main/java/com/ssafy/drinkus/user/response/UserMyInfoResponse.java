package com.ssafy.drinkus.user.response;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMyInfoResponse {
    private Long userId;
    private String userName;
    private String userFullname;
    private String userNickname;
    private Integer userPopularity;
    private String userBirthday;
    private String userIntroduce;
    private String userImg;
    private UserRole userRole;
    private Long userPoint;
    private Integer userSoju;
    private Integer userBeer;

    public static UserMyInfoResponse from(User user){
        return new UserMyInfoResponse(user.getUserId(), user.getUserName(), user.getUserFullname(), user.getUserNickname(), user.getUserPopularity(), user.getUserBirthday(),
                user.getUserIntroduce(), user.getUserImg(), user.getUserRole(), user.getUserPoint(), user.getUserSoju(), user.getUserBeer());
    }
}
