package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequest {

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이어야 합니다.")
    private String userName;

    @NotBlank(message = "비밀번호는 필수입니다.")
    private String userPw;

//    @NotBlank(message = "fcm 토큰은 필수입니다.")
    private String fcmToken;
}
