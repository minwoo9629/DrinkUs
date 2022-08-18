package com.ssafy.drinkus.category.response;

import com.ssafy.drinkus.category.domain.Category;
<<<<<<< HEAD
import com.ssafy.drinkus.user.domain.UserSubCategory;
=======
import com.ssafy.drinkus.category.domain.SubCategory;
>>>>>>> b022574098dd090828eeaccd5d274a14522abae7
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
