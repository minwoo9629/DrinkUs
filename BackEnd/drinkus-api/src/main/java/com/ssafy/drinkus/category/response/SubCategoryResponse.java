package com.ssafy.drinkus.category.response;

import com.ssafy.drinkus.category.domain.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryResponse {

    private Long subCategoryId;

    private String subCategoryName;

    private Boolean checked;

    public static SubCategoryResponse from(SubCategory subCategory, Boolean checked) {
        SubCategoryResponse subCategoryResponse = new SubCategoryResponse();
        subCategoryResponse.subCategoryId = subCategory.getSubCategoryId();
        subCategoryResponse.subCategoryName = subCategory.getSubCategoryName();
        subCategoryResponse.checked = checked;
        return subCategoryResponse;
    }

    public static SubCategoryResponse from(SubCategory subCategory) {
        SubCategoryResponse subCategoryResponse = new SubCategoryResponse();
        subCategoryResponse.subCategoryId = subCategory.getSubCategoryId();
        subCategoryResponse.subCategoryName = subCategory.getSubCategoryName();
        return subCategoryResponse;
    }
}
