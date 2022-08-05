package com.ssafy.drinkus.category.response;

import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.category.domain.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryListResponse {
    private CategoryResponse categoryResponse;

    private SubCategoryResponse subCategoryResponse;

    public static CategoryListResponse from(Category category, SubCategory subCategory, Boolean checked) {
        return new CategoryListResponse(
                CategoryResponse.from(category),
                SubCategoryResponse.from(subCategory, checked)
        );
    }
}
