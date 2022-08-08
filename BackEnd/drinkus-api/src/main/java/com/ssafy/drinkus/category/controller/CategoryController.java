package com.ssafy.drinkus.category.controller;


import com.ssafy.drinkus.category.response.CategoryListResponse;
import com.ssafy.drinkus.category.response.CategoryResponse;
import com.ssafy.drinkus.category.response.SubCategoryResponse;
import com.ssafy.drinkus.category.service.CategoryService;
import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    // 대분류 조회
    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> findAllCategory() {
        return ResponseEntity.ok(categoryService.findAllCategory());
    }

    //회원이 추가한 관심사 조회
    @GetMapping
    public ResponseEntity<List<CategoryListResponse>> findAllCategoryAndSubCategory(@LoginUser User user) {
        List<CategoryListResponse> body = categoryService.findAllCategoryAndSubCategory(user);
        return ResponseEntity.ok().body(body);
    }


    //타회원의 관심사 조회
    @GetMapping("/subcategory/{user_id}")
    public ResponseEntity<List<SubCategoryResponse>> findByUserId(@LoginUser User user, @PathVariable("user_id")Long userId) {
        List<SubCategoryResponse> body = categoryService.findByUserId(user.getUserId());
        return ResponseEntity.ok().body(body);
    }

    //회원의 관심사 생성(추가)
    @PostMapping("/{subcategory_id}")
    public ResponseEntity<Void> createUserInterest(@LoginUser User user, @PathVariable("subcategory_id")Long subCategoryId){
        categoryService.createUserInterest(user, subCategoryId);
        return ResponseEntity.ok().build();
    }

    //회원의 관심사 삭제
    @DeleteMapping("/{subcategory_id}")
    public ResponseEntity<Void> deleteUserSubCategory(@LoginUser User user, @PathVariable("subcategory_id")Long subCategoryId){
        categoryService.deleteUserInterest(user, subCategoryId);
        return ResponseEntity.ok().build();
    }

}
