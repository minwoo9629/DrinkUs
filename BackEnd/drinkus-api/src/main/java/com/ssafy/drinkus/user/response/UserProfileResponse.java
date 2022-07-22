package com.ssafy.drinkus.user.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;

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
