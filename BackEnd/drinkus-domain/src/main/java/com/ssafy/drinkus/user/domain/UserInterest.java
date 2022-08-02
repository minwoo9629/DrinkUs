package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.interest.domain.Interest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class UserInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_interest_id")
    private Long userInterestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_id")
    private Interest interest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //관심사 추가
    public static UserInterest createUserInterest(User user, Interest interest){
        UserInterest userInterest = new UserInterest();
        userInterest.interest = interest;
        userInterest.user = user;
        return userInterest;
    }

}
