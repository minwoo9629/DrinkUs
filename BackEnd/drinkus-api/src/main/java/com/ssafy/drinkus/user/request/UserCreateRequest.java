package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data // Getter, Setter, RequiredArgsConstructor, ToString, EqualsAndHashCode, Value
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {

    @Email(message = "")
    @NotBlank(message = "이메일은 필수값입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    private String pw;

    @NotBlank(message = "이름은 필수값입니다.")
    private String name;
}
