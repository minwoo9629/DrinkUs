package com.ssafy.drinkus.user.response;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserInterest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInterestResponse {
    private Long userId;
    private Long interestId;
    private String interestName;

    public static UserInterestResponse from(UserInterest userInterest){
        return new UserInterestResponse(userInterest.getUser().getUserId(), userInterest.getInterest().getInterestId(), userInterest.getInterest().getInterestName());
    }
}
