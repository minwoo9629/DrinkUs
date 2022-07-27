package com.ssafy.drinkus.security.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getUserEmail() {
        return (String) attributes.get("email");
    }


    @Override
    public UserProvider getUserProvider() {
        return UserProvider.google;
    }

    @Override
    public String getUserName() {
        return getUserProvider() + "_" + getUserProviderId();
    }

    @Override
    public String getUserProviderId() {
        return (String) attributes.get("sub");
    }
}
