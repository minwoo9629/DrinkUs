package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFindMyIdRequest {
    @NotBlank(message = "이름 입력은 필수입니다.")
    private String userFullname;

    private LocalDate userBirthday;
}
