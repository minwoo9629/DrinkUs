package com.ssafy.drinkus.category.response;

import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.category.domain.SubCategory;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserSubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryListResponse {

    private CategoryResponse categoryResponse;

    private List<SubCategoryResponse> subCategoryResponse;

    public static CategoryListResponse from(Category category, List<UserSubCategory> userSubCategoryList) {
        CategoryListResponse categoryListResponse = new CategoryListResponse();
        categoryListResponse.categoryResponse = CategoryResponse.from(category);
        categoryListResponse.subCategoryResponse = category.getSubCategoryList().stream()
                .map(subCategory -> SubCategoryResponse.from(subCategory, userSubCategoryList))
                .collect(Collectors.toList());
        return categoryListResponse;
    }
}
