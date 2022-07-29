package com.ssafy.drinkus.dailyboard;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class DailyBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId; // 글 번호

    private Long createrId; // 작성자 번호

    private Long modifierId; // 수정자 번호

    private String boardContent; // 글 내용

    private Long parentId; // 원글 번호

    // 원글
    public static DailyBoard createDailyBoard(Long createrId, Long modifierId, String boardContent) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.createrId = createrId;
        dailyBoard.modifierId = modifierId;
        dailyBoard.boardContent = boardContent;

        return dailyBoard;
    }

    // 답글
    public static DailyBoard createDailyBoard(Long createrId, Long modifierId, String boardContent, Long parentId) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.createrId = createrId;
        dailyBoard.modifierId = modifierId;
        dailyBoard.boardContent = boardContent;
        dailyBoard.parentId = parentId;

        return dailyBoard;
    }

    public void updateDailyBoard(Long modifierId, String boardContent){
        this.modifierId = modifierId;
        this.boardContent = boardContent;
    }
}
