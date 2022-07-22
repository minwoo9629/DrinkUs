package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdatePasswordRequest {
    private Long userNo;

    private String userBeforePw;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}",message = "비밀번호는 영문 " +
            "대,소문자와 숫자,특수기호가" +
            " 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.")
    private String userPw;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}",message = "비밀번호는 영문 " +
            "대,소문자와 숫자,특수기호가" +
            " 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.")
    private String userCheckPw;
}
