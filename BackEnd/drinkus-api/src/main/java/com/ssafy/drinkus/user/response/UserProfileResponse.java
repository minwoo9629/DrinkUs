package com.ssafy.drinkus.user.response;

import com.ssafy.drinkus.user.domain.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String userNickname;
    private Integer userPopularity;
    private String userIntroduce;
    private String userImg;
    private Integer userSoju;
    private Integer userBeer;

    public static UserProfileResponse from(User user){
        return new UserProfileResponse(
                user.getUserNickname(), user.getUserPopularity(), user.getUserIntroduce(), user.getUserImg(),
                user.getUserSoju(), user.getUserBeer()
        );
    }
}
