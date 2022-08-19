package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDuplicateCheckIdRequest {
    @Email(message = "유효하지 않은 이메일 형식입니다.")
    private String userName;
}
