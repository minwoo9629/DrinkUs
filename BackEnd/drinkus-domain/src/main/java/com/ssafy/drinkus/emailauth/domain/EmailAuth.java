package com.ssafy.drinkus.emailauth.domain;

import com.ssafy.drinkus.common.type.YN;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EmailAuth {
    private static final long EMAIL_TOKEN_EXPIRE_TIME = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName; // 인증을 진행할 이메일

    private String authToken; // 토큰

    @Enumerated(EnumType.STRING)
    private YN expired; // 토큰 만료 여부

    private LocalDateTime expireDate; // 토큰 만료일시

    public static EmailAuth createEmailAuth(String userName, String authToken){
        EmailAuth emailAuth = new EmailAuth();
        emailAuth.userName = userName;
        emailAuth.authToken = authToken;
        emailAuth.expired = YN.N;
        emailAuth.expireDate = LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRE_TIME);

        return emailAuth;
    }

    // 토큰 사용으로 인한 만료
    public void useToken(){
        expired = YN.Y;
    }
}
