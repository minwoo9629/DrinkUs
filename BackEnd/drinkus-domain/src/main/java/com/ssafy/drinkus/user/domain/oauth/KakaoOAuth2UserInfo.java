package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    private Map<String, Object> attributesAccount;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
    }

    @Override
    public String getUserEmail() {
        return attributesAccount.get("email").toString();
    }


    @Override
    public UserProvider getUserProvider() {
        return UserProvider.kakao;
    }

    @Override
    public String getUserProviderId() {
        return getUserProvider() + "_" + getUserName();
    }

    @Override
    public String getUserName() {
        return String.valueOf(attributes.get("id"));
    }
}
