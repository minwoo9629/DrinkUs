package com.ssafy.drinkus.dailyboard.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class DailyBoard extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId; // 글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creater_id")
    private User creater; // 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modifier_id")
    private User modifier; // 수정자

    private String boardContent; // 글 내용

    private Long parentId; // 원글 번호

    // 원글
    public static DailyBoard createDailyBoard(User creater, User modifier, String boardContent) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.creater = creater;
        dailyBoard.modifier = modifier;
        dailyBoard.boardContent = boardContent;

        return dailyBoard;
    }

    // 답글
    public static DailyBoard createDailyBoard(User creater, User modifier, String boardContent, Long parentId) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.creater = creater;
        dailyBoard.modifier = modifier;
        dailyBoard.boardContent = boardContent;
        dailyBoard.parentId = parentId;

        return dailyBoard;
    }

    public void updateDailyBoard(User modifier, String boardContent) {
        this.modifier = modifier;
        this.boardContent = boardContent;
    }
}
