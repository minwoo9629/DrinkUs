package com.ssafy.drinkus.room.query;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.drinkus.common.type.YN.Y;
import static com.ssafy.drinkus.room.domain.QRoom.room;

@Repository
@RequiredArgsConstructor
public class RoomQueryRepository {
    private final JPAQueryFactory queryFactory;

    //페이징
    public Page<Room> findBySearchCondition(String searchKeyword, Boolean sameAge, int sortOrder,
                                            Long categoryId, Pageable pageable, User user) {

        //페이징
        QueryResults<Room> result = queryFactory
                .selectFrom(room)
                .where(
                        searchKeywordEq(searchKeyword),
                        sameAgeFirstEq(sameAge, user),
                        sameAgeSecondEq(sameAge, user),
                        categoryIdEq(categoryId)
                )
                .orderBy(orderByEq(sortOrder))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<Room> content = result.getResults();
        long total = result.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    private BooleanExpression searchKeywordEq(String searchKeyword) {
        return StringUtils.hasText(searchKeyword) ? room.roomName.contains(searchKeyword) : null;
    }

    private BooleanExpression sameAgeFirstEq(Boolean sameAge, User user) {
        // 나이의 알고리즘을 계산하여 또래 범위 알기
        int sameAgeFirst = getUserAge(user) / 10;
        System.out.println("sameAgeFirst "+sameAgeFirst);

        switch (sameAgeFirst) {
            case 2:
                return (sameAge != null && sameAge) ? room.ages20.eq(Y) : null;
            case 3:
                return (sameAge != null && sameAge) ? room.ages30.eq(Y) : null;
            case 4:
                return (sameAge != null && sameAge) ? room.ages40.eq(Y) : null;
            case 5:
                return (sameAge != null && sameAge) ? room.ages50.eq(Y) : null;
            case 6:
                return (sameAge != null && sameAge) ? room.ages60.eq(Y) : null;
            case 7:
                return (sameAge != null && sameAge) ? room.ages70.eq(Y) : null;
        }

        return null;
    }

    private BooleanExpression sameAgeSecondEq(Boolean sameAge, User user) {
        // 나이의 알고리즘을 계산하여 또래 범위 알기
        Integer sameAgeSecond = getUserAge(user) / 10 + ((getUserAge(user) % 10 >= 5) ? 1 : -1);
        System.out.println("sameAgeSecond "+sameAgeSecond);

        switch (sameAgeSecond) {
            case 1:
                return null;
            case 2:
                return (sameAge != null && sameAge) ? room.ages20.eq(Y) : null;
            case 3:
                return (sameAge != null && sameAge) ? room.ages30.eq(Y) : null;
            case 4:
                return (sameAge != null && sameAge) ? room.ages40.eq(Y) : null;
            case 5:
                return (sameAge != null && sameAge) ? room.ages50.eq(Y) : null;
            case 6:
                return (sameAge != null && sameAge) ? room.ages60.eq(Y) : null;
            case 7:
                return (sameAge != null && sameAge) ? room.ages70.eq(Y) : null;
        }
        return null;
    }

    private BooleanExpression categoryIdEq(Long categoryId){
        return (categoryId != null && categoryId > 0) ? room.category.categoryId.eq(categoryId) : null;
    }

    private OrderSpecifier orderByEq(Integer sortOrder){
        return (sortOrder == 1) ? room.createdDate.asc() : room.createdDate.desc(); 
    }
    public int getUserAge(User user){
        String userBirth = user.getUserBirthday().substring(0,4);
        System.out.println("userBirth "+userBirth);
        System.out.println(LocalDate.now().getYear() - Integer.parseInt(userBirth) + 1);
        return LocalDate.now().getYear() - Integer.parseInt(userBirth) + 1;
    }
}
