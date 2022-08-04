package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @NotBlank(message = "닉네임은 필수값입니다.")
    private String userNickname;

    private String userIntroduce;

    private Integer userSoju;

    private Integer userBeer;

    private String userImg;

    private String userBirthday;
}
