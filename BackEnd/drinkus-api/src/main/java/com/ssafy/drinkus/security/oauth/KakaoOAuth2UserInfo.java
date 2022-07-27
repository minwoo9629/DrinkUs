package com.ssafy.drinkus.security.oauth;

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
    public String getUserName() {
        return getUserProvider() + "_" + getUserProviderId();
    }

    @Override
    public String getUserProviderId() {
        return String.valueOf(attributes.get("id"));
    }
}
