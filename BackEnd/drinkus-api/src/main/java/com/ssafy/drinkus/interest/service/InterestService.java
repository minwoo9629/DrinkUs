package com.ssafy.drinkus.interest.service;


import com.ssafy.drinkus.interest.domain.Category;
import com.ssafy.drinkus.interest.domain.CategoryRepository;
import com.ssafy.drinkus.interest.domain.Interest;
import com.ssafy.drinkus.interest.domain.InterestRepository;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import com.ssafy.drinkus.interest.response.InterestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InterestService {
    private final CategoryRepository categoryRepository;
    private final InterestRepository interestRepository;

    public List<CategoryResponse> findAllCategory() {
        List<Category> categoryList = categoryRepository.findAll();
        return categoryList.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
    }

    public List<InterestResponse> findAllInterest() {
        List<Interest> interestList = interestRepository.findAll();
        return interestList.stream()
                .map(InterestResponse::from)
                .collect(Collectors.toList());
    }
}
