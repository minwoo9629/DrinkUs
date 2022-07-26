package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @NotBlank(message = "닉네임은 필수값입니다.")
    @Email(message = "이메일 형식에 맞춰주세요")
    private String userNickname;

    private String userIntroduce;

    private Integer userSoju;

    private Integer userBeer;

    private String userImg;


}
