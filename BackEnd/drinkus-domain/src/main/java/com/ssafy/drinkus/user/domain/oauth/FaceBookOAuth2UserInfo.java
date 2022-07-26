package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class FaceBookOAuth2UserInfo extends OAuth2UserInfo {

    public FaceBookOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getUserEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public UserProvider getUserProvider() {
        return UserProvider.facebook;
    }

    @Override
    public String getUserName() {
        return getUserProvider() + "_" + getUserProviderId();
    }

    @Override
    public String getUserProviderId() {
        return (String) attributes.get("id");
    }
}
