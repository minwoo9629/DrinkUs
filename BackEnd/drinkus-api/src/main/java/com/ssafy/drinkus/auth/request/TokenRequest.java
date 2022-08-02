package com.ssafy.drinkus.auth.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {
    private String accessToken;
    private String refreshToken;
}
