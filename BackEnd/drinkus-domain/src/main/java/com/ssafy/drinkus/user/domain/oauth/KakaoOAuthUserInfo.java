package com.ssafy.drinkus.user.domain.oauth;

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
    public String getUserId() {
        return attributesAccount.get("email").toString();
    }

    @Override
    public String getUserName() {
        return attributesProfile.get("nickname").toString();
    }
}
