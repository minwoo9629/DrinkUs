package com.ssafy.drinkus.user.domain.oauth;

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

    public abstract String getUserId(); // 이메일

    public abstract String getUserName();
}
