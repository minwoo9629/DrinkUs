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

import java.util.List;

import static com.ssafy.drinkus.common.type.YN.Y;
import static com.ssafy.drinkus.room.QRoom.*;

@Repository
@RequiredArgsConstructor
public class RoomQueryRepository {
    private final JPAQueryFactory queryFactory;

    //페이징
    public Page<Room> findBySearchCondition(String searchKeyword, Boolean sameAge, Integer sortOrder,
                                            Long categoryId, Pageable pageable, User user) {
        //페이징
        QueryResults<Room> result = queryFactory
                .selectFrom(room).distinct()
                .where(
                        searchKeywordEq(searchKeyword),
                        sameAgeEq(sameAge, user)

                )
                .groupBy(room)
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

    private BooleanExpression sameAgeEq(Boolean sameAge, User user) {
        return (sameAge != null && sameAge) ? room.ages20.eq(Y) : null;
    }

    private OrderSpecifier orderByEq(Integer sortOrder){
        return (sortOrder == 1) ? room.createdDate.asc() : room.createdDate.desc(); 
    }

}
