package com.ssafy.drinkus.category.response;

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
public class SubCategoryResponse {

    private Long subCategoryId;

    private String subCategoryName;

    private Boolean checked;

    public static SubCategoryResponse from(SubCategory subCategory, List<UserSubCategory> userSubCategoryList) {
        SubCategoryResponse subCategoryResponse = new SubCategoryResponse();
        subCategoryResponse.subCategoryId = subCategory.getSubCategoryId();
        subCategoryResponse.subCategoryName = subCategory.getSubCategoryName();
        subCategoryResponse.checked = false;

        List<UserSubCategory> result = userSubCategoryList.stream()
                .filter(userSubCategory -> userSubCategory.getSubCategory() == subCategory)
                .collect(Collectors.toList());
            subCategoryResponse.checked = (result.size() >= 1);
        return subCategoryResponse;
    }

    public static SubCategoryResponse from(SubCategory subCategory) {
        SubCategoryResponse subCategoryResponse = new SubCategoryResponse();
        subCategoryResponse.subCategoryId = subCategory.getSubCategoryId();
        subCategoryResponse.subCategoryName = subCategory.getSubCategoryName();
        return subCategoryResponse;
    }
}
