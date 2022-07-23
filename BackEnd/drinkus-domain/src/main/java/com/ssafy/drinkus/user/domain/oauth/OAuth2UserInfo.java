package com.ssafy.drinkus.user.domain.oauth;

import com.ssafy.drinkus.user.domain.type.UserProvider;

import javax.persistence.Embeddable;
import java.util.Map;

@Embeddable
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getUserEmail();

    public abstract UserProvider getUserProvider();

    public abstract String getUserProviderId();

    public abstract String getUserName();
}
