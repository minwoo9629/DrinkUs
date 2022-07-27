package com.ssafy.drinkus.email.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserNameCheckRequest {
    
    @NotBlank(message = "이메일을 입력해주세요")
    @Email(message = "이메일 형식에 맞춰주세요")
    private String userName;
}
