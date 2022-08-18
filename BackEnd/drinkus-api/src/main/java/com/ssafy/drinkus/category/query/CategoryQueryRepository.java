package com.ssafy.drinkus.category.query;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.category.domain.SubCategory;
import com.ssafy.drinkus.category.response.SubCategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.drinkus.category.domain.QSubCategory.subCategory;
import static com.ssafy.drinkus.user.domain.QUserSubCategory.userSubCategory;

@Repository
@RequiredArgsConstructor
public class CategoryQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<SubCategoryResponse> findByUserId(Long userId){
        List<SubCategory> results = queryFactory
                .selectFrom(subCategory)
                .innerJoin(userSubCategory)
                .on(subCategory.SubCategoryId.eq(userSubCategory.subCategory.SubCategoryId))
                .where(userSubCategory.user.userId.eq(userId))
                .fetch();

        return results.stream()
                .map(SubCategoryResponse::from)
                .collect(Collectors.toList());
    }

<<<<<<< HEAD
    public Long findCategoryIdByUserId(Long userId) {
        Tuple tuple = queryFactory
                .select(subCategory.category.categoryId, subCategory.SubCategoryId.count())
                .from(subCategory)
                .join(subCategory.userSubCategoryList, userSubCategory)
                .where(userSubCategory.user.userId.eq(userId))
                .groupBy(subCategory.category.categoryId)
                .orderBy(subCategory.SubCategoryId.count().desc())
                .limit(1)
                .fetchOne();
        return tuple.get(subCategory.category.categoryId);
    }
}
=======

}
>>>>>>> b022574098dd090828eeaccd5d274a14522abae7
