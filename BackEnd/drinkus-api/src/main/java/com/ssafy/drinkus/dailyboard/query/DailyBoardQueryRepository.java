package com.ssafy.drinkus.dailyboard.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.dailyboard.DailyBoard;
import com.ssafy.drinkus.dailyboard.QDailyBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DailyBoardQueryRepository {
    private  final JPAQueryFactory queryFactory;

    public void deleteAllReplies(Long boardId){
        QDailyBoard qDailyBoard = new QDailyBoard("dailyBoard");

        queryFactory
                .delete(qDailyBoard)
                .where(qDailyBoard.parentId.eq(boardId))
                .execute();
    }
}
