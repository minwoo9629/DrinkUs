package com.ssafy.drinkus.interest.response;

import com.ssafy.drinkus.interest.domain.Interest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterestResponse {
    private Long interestId;

    private String interestName;

    private CategoryResponse category;

    public static InterestResponse from(Interest interest) {
        InterestResponse interestResponse = new InterestResponse();
        interestResponse.interestId = interest.getInterestId();
        interestResponse.interestName = interest.getInterestName();
        interestResponse.category = CategoryResponse.from(interest.getCategory());
        return interestResponse;
    }
}
