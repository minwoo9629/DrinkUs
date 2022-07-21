package com.ssafy.drinkus.user.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userEmail;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userNickname;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer userPopularity;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer userPopularityLimit;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDate userBirthday;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userIntroduce;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userImg;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime userDeleteDate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private YN userDeleted;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UserRole userRole;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long userPoint;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime createdDate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime userStopDate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer userSoju;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer userBeer;

    public static UserResponse of(User user) {
        UserResponse res = new UserResponse();
        res.setUserEmail(user.getUserEmail());
        res.setUserName(user.getUserName());
        res.setUserNickname(user.getUserNickname());
        res.setUserPopularity(user.getUserPopularity());
        res.setUserPopularityLimit(user.getUserPopularityLimit());
        res.setUserBirthday(user.getUserBirthday());
        res.setUserIntroduce(user.getUserIntroduce());
        res.setUserImg(user.getUserImg());
        res.setUserDeleted(user.getUserDeleted());
        res.setUserDeleteDate(user.getUserDeleteDate());
        res.setUserRole(user.getUserRole());
        res.setUserPoint(user.getUserPoint());
        res.setCreatedDate(user.getCreatedDate());
        res.setUserStopDate(user.getUserStopDate());
        res.setUserSoju(user.getUserSoju());
        res.setUserBeer(user.getUserBeer());
        return res;
    }

    public static UserResponse ofPublic(User user){
        UserResponse res = new UserResponse();
        res.setUserNickname(user.getUserNickname());
        res.setUserPopularity(user.getUserPopularity());
        res.setUserIntroduce(user.getUserIntroduce());
        res.setUserImg(user.getUserImg());
        res.setUserSoju(user.getUserSoju());
        res.setUserBeer(user.getUserBeer());
        return res;
    }

}
