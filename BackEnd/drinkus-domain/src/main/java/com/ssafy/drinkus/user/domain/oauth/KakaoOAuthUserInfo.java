package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class KakaoOAuthUserInfo extends OAuth2UserInfo {

    private Map<String, Object> attributesAccount;
    private Map<String, Object> attributesProfile;

    public KakaoOAuthUserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
    }

    @Override
    public String getUserEmail() {
        return attributesAccount.get("email").toString();
    }

    @Override
    public String getUserFullName() {
        return attributesProfile.get("nickname").toString();
    }

    @Override
    public UserProvider getUserProvider() {
        return UserProvider.kakao;
    }

    @Override
    public String getUserProviderId() {
        return "카카오인디" + getUserName();
    }

    @Override
    public String getUserName() {
        return "asdasd@asdasd.com";
    }
}
