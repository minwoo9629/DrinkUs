package com.ssafy.drinkus.dailyboard.response;

import com.ssafy.drinkus.dailyboard.domain.DailyBoard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyBoardResponse {
    // 글 번호
    Long articleId;

    // 글 내용
    String articleContent;

    // 원글
    String type;

    public static MyBoardResponse from (DailyBoard dailyBoard){
        return new MyBoardResponse(dailyBoard.getBoardId(), dailyBoard.getBoardContent(), dailyBoard.getParentId() == null ? "원글" : "답글");
    }
}
