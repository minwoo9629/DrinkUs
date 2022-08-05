package com.ssafy.drinkus.auth;

import com.ssafy.drinkus.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Auth extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String refreshToken;

    public static Auth createRefreshToken(Long userId, String refreshToken){
        Auth auth = new Auth();
        auth.userId = userId;
        auth.refreshToken = refreshToken;
        return auth;
    }

    public Auth updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
        return this;
    }
}
