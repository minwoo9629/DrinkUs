package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.common.NotExistException;
import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(UserProvider.google.name())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new NotExistException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
