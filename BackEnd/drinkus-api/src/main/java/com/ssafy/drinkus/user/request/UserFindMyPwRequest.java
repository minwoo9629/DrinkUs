package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFindMyPwRequest {
    @NotBlank(message = "이메일 입력은 필수입니다.")
    private String userName;
}
