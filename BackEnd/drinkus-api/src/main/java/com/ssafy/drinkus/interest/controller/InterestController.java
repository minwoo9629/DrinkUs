package com.ssafy.drinkus.interest.controller;


import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import com.ssafy.drinkus.interest.response.InterestResponse;
import com.ssafy.drinkus.interest.service.InterestService;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
public class InterestController {
    private final InterestService interestService;
    // 대분류 조회
    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> findAllCategory() {
        return ResponseEntity.ok(interestService.findAllCategory());
    }

    // 관심사 조회
    @GetMapping
    public ResponseEntity<List<InterestResponse>> findAllInterest() {
        return ResponseEntity.ok(interestService.findAllInterest());
    }

}
