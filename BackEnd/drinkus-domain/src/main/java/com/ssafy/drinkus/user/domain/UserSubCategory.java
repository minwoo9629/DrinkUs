package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.category.domain.SubCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class UserSubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_subcategory_id")
    private Long userSubCategoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //관심사 추가
    public static UserSubCategory createUserInterest(User user, SubCategory subCategory){
        UserSubCategory userSubCategory = new UserSubCategory();
        userSubCategory.subCategory = subCategory;
        userSubCategory.user = user;
        return userSubCategory;
    }

}
