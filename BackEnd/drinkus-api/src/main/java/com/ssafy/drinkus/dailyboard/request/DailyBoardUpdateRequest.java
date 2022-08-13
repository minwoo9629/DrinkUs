package com.ssafy.drinkus.dailyboard.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyBoardUpdateRequest {
    // 수정할 내용
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(max = 100)
    private String boardContent;
}
