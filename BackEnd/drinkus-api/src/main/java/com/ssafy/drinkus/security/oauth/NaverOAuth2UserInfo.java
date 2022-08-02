package com.ssafy.drinkus.security.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    private Map<String, Object> attributesAccount;

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
    }

    @Override
    public String getUserEmail() {
        return attributesAccount.get("email").toString();
    }


    @Override
    public UserProvider getUserProvider() {
        return UserProvider.naver;
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
