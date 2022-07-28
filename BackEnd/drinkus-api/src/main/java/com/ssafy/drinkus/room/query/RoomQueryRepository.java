package com.ssafy.drinkus.room.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.room.Room;
import com.ssafy.drinkus.room.response.RoomListResponse;
import lombok.RequiredArgsConstructor;
import com.querydsl.jpa.JPAExpressions;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomQueryRepository {
    private final JPAQueryFactory queryFactory;

//    public List<RoomListResponse> findBySearchCondition(String searchKeyword, Boolean sameAge, Integer sortOrder, Integer categoryFirst, Integer categorySecond, Integer categoryThird){
//        return queryFactory
//                .select(new RoomListResponse())
//                .from(room)
//                .where(titleLike(searchKeyword),
//                        categoryEq(categoryId),
//                        majorEq(majorId),
//                        itemIdLt(itemId),
//                        room.status.eq(Status.SALE),
//                        room.seller.id.notIn(
//                                JPAExpressions
//                                        .select(block.target.id)
//                                        .from(block)
//                                        .where(block.user.id.eq(userId))
//                        )
//                )
//                .orderBy(room.id.desc())
//                .limit(size)
//                .fetch();
//    }
}
