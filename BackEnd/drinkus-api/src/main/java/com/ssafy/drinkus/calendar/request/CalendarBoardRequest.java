package com.ssafy.drinkus.calendar.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.drinkus.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarBoardRequest {

    @NotBlank(message = "내용을 입력해주세요.")
    @Size(max = 200)
    String calendarContent;

    @Future
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMddHHmm")
    LocalDateTime calendarDatetime;

    @Range(min = 2, max = 8)
    Integer peopleLimit;

    String place;

    YN[] ages;
}
