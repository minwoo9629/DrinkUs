package com.ssafy.drinkus.dailyboard.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.drinkus.dailyboard.DailyBoard;
import com.ssafy.drinkus.dailyboard.QDailyBoard;
import com.ssafy.drinkus.dailyboard.response.DailyBoardResponse;
import com.ssafy.drinkus.dailyboard.response.MyBoardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class DailyBoardQueryRepository {
    private final JPAQueryFactory queryFactory;

    private static QDailyBoard qDailyBoard = QDailyBoard.dailyBoard;

    // 페이징을 위해 원본 글의 총 글 개수를 반환한다.
    public Long getDailyBoardCount() {
        return queryFactory
                .selectFrom(qDailyBoard)
                .where(qDailyBoard.parentId.isNull()) // 부모 Id가 없는 것이 원본 글
                .fetchCount();
    }

    // 페이지별로 원본글을 반환한다.
    public List<DailyBoardResponse> findDailyBoardByPages(long page) {
        final int PAGING = 10;
        List<DailyBoard> result =
                queryFactory
                        .selectFrom(qDailyBoard)
                        .where(qDailyBoard.parentId.isNull()) // 부모 Id가 없는 것이 원본 글
                        .offset((page - 1) * PAGING)
                        .limit(PAGING)
                        .fetch();

        List<DailyBoardResponse> dailyBoardResponses = new ArrayList<>();
        for (DailyBoard dailyBoard : result) {
            dailyBoardResponses.add(new DailyBoardResponse(dailyBoard.getBoardId(), dailyBoard.getCreater().getUserId(), dailyBoard.getCreatedDate(), dailyBoard.getModifiedDate(), dailyBoard.getBoardContent()));
        }

        return dailyBoardResponses;
    }


    // 페이징을 위해 내가 쓴 글의 총 글 개수를 반환한다.
    public Long getMyBoardCount(Long userId) {
        return queryFactory
                .selectFrom(qDailyBoard)
                .where(qDailyBoard.creater.userId.eq(userId))
                .fetchCount();
    }

    // 페이지별로 원본글을 반환한다.
    public List<MyBoardResponse> findMyBoardByPages(Long userId, Long page) {
        List<DailyBoard> result =
                queryFactory
                        .selectFrom(qDailyBoard)
                        .where(qDailyBoard.creater.userId.eq(userId))
                        .offset((page - 1) * 10)
                        .limit(10)
                        .fetch();

        List<MyBoardResponse> myBoardResponses = new ArrayList<>();
        for (DailyBoard dailyBoard : result) {
            myBoardResponses.add(new MyBoardResponse(dailyBoard.getBoardId(), dailyBoard.getBoardContent()));
        }

        return myBoardResponses;
    }

    // 원글에 대한 답글 모두 삭제
    public void deleteAllReplies(Long boardId) {
        queryFactory
                .delete(qDailyBoard)
                .where(qDailyBoard.parentId.eq(boardId))
                .execute();
    }

}
