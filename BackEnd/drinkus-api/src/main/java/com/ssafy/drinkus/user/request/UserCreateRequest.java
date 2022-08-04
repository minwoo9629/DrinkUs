package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data // Getter, Setter, RequiredArgsConstructor, ToString, EqualsAndHashCode, Value
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @NotBlank(message = "이메일은 필수값입니다.")
    @Email(message = "이메일 형식에 맞춰주세요")
    private String userName;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message = "비밀번호는 영문 " +
            "대,소문자와 숫자,특수기호가" +
            " 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.")
    private String userPw;

    @NotBlank(message = "이름은 필수값입니다.")
    private String userFullname;

    private String userBirthday;
}
