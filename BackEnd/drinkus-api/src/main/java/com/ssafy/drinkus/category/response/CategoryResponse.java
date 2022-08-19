package com.ssafy.drinkus.category.response;

import com.ssafy.drinkus.category.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long categoryId = null;

    private String categoryName;

    public static CategoryResponse from(Category category) {
        return category == null ? null : new CategoryResponse(category.getCategoryId(), category.getCategoryName());
    }
}
