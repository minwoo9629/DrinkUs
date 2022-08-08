package com.ssafy.drinkus.dailyboard.response;

import com.ssafy.drinkus.dailyboard.DailyBoard;
import com.ssafy.drinkus.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyBoardResponse {

    // 글 번호
    Long boardId;

    // 작성자
    Long createrId;

    // 작성일
    LocalDateTime createdDate;

    // 수정일
    LocalDateTime modifiedDate;

    // 글 내용
    String boardContent;

    public static DailyBoardResponse from(DailyBoard dailyBoard) {
        return new DailyBoardResponse(dailyBoard.getBoardId(), dailyBoard.getCreater().getUserId(), dailyBoard.getCreatedDate(), dailyBoard.getModifiedDate(), dailyBoard.getBoardContent());
    }
}
