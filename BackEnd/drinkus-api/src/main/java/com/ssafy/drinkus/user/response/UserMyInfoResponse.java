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

    private String userName;
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
        return new UserMyInfoResponse(user.getUserName(), user.getUserNickname(), user.getUserPopularity(), user.getUserBirthday(),
                user.getUserIntroduce(), user.getUserImg(), user.getUserRole(), user.getUserPoint(), user.getUserSoju(), user.getUserBeer());
    }
}
