package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.common.NotExistException;
import com.ssafy.drinkus.user.domain.type.UserProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equals(UserProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equals(UserProvider.kakao.toString())) {
            return new KakaoOAuth2UserInfo(attributes);
        } else if (registrationId.equals(UserProvider.naver.toString())) {
            return new NaverOAuth2UserInfo(attributes);
        } else if (registrationId.equals(UserProvider.facebook.toString())) {
            return new FaceBookOAuth2UserInfo(attributes);
        } else {
            throw new NotExistException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
