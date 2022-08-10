package com.ssafy.drinkus.category.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.category.domain.SubCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.ssafy.drinkus.category.domain.QCategory.*;
import static com.ssafy.drinkus.category.domain.QSubCategory.subCategory;
import static com.ssafy.drinkus.user.domain.QUserSubCategory.userSubCategory;

@Repository
@RequiredArgsConstructor
public class CategoryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<Category> findAllCategoryAndSubCategory() {
        return queryFactory
                .selectFrom(category).distinct()
                .join(category.subCategoryList, subCategory).fetchJoin()
                .fetch();
    }

    public List<SubCategory> findByUserId(Long userId) {
        List<SubCategory> results = queryFactory
                .selectFrom(subCategory)
                .innerJoin(userSubCategory)
                .on(subCategory.SubCategoryId.eq(userSubCategory.subCategory.SubCategoryId))
                .where(userSubCategory.user.userId.eq(userId))
                .fetch();

        return results;
    }

//        select category_id, count(s.subcategory_id) as cnt
//        from sub_category s
//        join user_sub_category us
//        on s.subcategory_id = us.subcategory_id
//        where user_id = 3
//        group by s.category_id
//        order by cnt desc
//        limit 1;
}