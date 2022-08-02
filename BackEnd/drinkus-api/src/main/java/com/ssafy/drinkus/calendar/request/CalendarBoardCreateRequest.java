package com.ssafy.drinkus.calendar.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.drinkus.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarBoardCreateRequest {

    @NotBlank(message = "제목을 입력해주세요.")
    String calendarTitle;

    String calendarDescription;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMddHHmm")
    LocalDateTime calendarDatetime;

    Integer peopleLimit;

    String place;

    YN[] ages;
}
