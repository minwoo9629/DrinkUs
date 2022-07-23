package com.ssafy.drinkus.user.domain.type;

import lombok.Getter;

@Getter
public enum UserProvider {
    local,
    google,
    kakao,
    naver,
    facebook
}
