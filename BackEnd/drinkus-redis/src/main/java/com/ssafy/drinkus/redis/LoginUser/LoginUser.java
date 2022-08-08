package com.ssafy.drinkus.redis.LoginUser;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("user")
public class LoginUser {
    @Id
    private Long userId;

    private String userNickname;

    public static LoginUser createLoginUser(Long userId, String userNickname){
        LoginUser loginUser = new LoginUser();
        loginUser.userId = userId;
        loginUser.userNickname = userNickname;
        return loginUser;
    }
}
