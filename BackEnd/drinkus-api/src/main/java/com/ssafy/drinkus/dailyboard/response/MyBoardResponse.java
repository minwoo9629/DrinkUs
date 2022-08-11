package com.ssafy.drinkus.dailyboard.response;

import com.ssafy.drinkus.dailyboard.DailyBoard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyBoardResponse {
    // 글 번호
    Long boardId;

    // 글 내용
    String boardContent;

    public static MyBoardResponse from (DailyBoard dailyBoard){
        return new MyBoardResponse(dailyBoard.getBoardId(), dailyBoard.getBoardContent());
    }
}
