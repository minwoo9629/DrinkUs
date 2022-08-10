package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.category.domain.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSubCategoryRepository extends JpaRepository<UserSubCategory, Long> {
    List<UserSubCategory> findByUser(User user);

    Boolean existsUserSubCategoryBySubCategoryAndAndUser(SubCategory subCategory, User user);

    Integer deleteByUserAndSubCategory(User user, SubCategory subCategory);
}
