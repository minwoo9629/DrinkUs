package com.ssafy.drinkus.dailyboard.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.dailyboard.domain.DailyBoard;
import com.ssafy.drinkus.dailyboard.domain.QDailyBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.ssafy.drinkus.user.domain.QUser.user;

@Repository
@RequiredArgsConstructor
public class DailyBoardQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Optional<DailyBoard> findDailyAndUserById(Long parentId){
        DailyBoard dailyBoard = queryFactory
                .selectFrom(QDailyBoard.dailyBoard)
                .join(QDailyBoard.dailyBoard.creater, user).fetchJoin()
                .where(QDailyBoard.dailyBoard.parentId.eq(parentId))
                .fetchOne();
        return Optional.ofNullable(dailyBoard);
    }
}
