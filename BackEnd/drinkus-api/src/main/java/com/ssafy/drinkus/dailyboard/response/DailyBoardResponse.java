package com.ssafy.drinkus.dailyboard.response;

import com.ssafy.drinkus.dailyboard.domain.DailyBoard;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyBoardResponse {

    // 글 번호
    Long boardId;

    // 작성자
    UserMyInfoResponse creater;

    // 작성일
    LocalDateTime createdDate;

    // 수정일
    LocalDateTime modifiedDate;

    // 글 내용
    String boardContent;

    public static DailyBoardResponse from(DailyBoard dailyBoard) {
        DailyBoardResponse dailyBoardResponse = new DailyBoardResponse();
        dailyBoardResponse.boardId = dailyBoard.getBoardId();
        dailyBoardResponse.creater = UserMyInfoResponse.from(dailyBoard.getCreater());
        dailyBoardResponse.createdDate = dailyBoard.getCreatedDate();
        dailyBoardResponse.modifiedDate = dailyBoard.getModifiedDate();
        dailyBoardResponse.boardContent = dailyBoard.getBoardContent();
        return dailyBoardResponse;
    }
}
