package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.user.domain.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;

// Authentication 객체에 저장하기 위함
@Data
public class UserPrincipal implements UserDetails, OAuth2User {

    private Long userId;
    private String userName;
    private String userPw;
    private String userEmail;
    private String userFullName;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserPrincipal(Long userId, String userName, String userPw, String userEmail, String userFullName, Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.userName = userName;
        this.userPw = userPw;
        this.userEmail = userEmail;
        this.userFullName = userFullName;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {

        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(String.valueOf(user.getUserRole())));

        return new UserPrincipal(
                user.getUserId(),
                user.getUserName(),
                user.getUserPw(),
                user.getUserEmail(),
                user.getUserFullName(),
                authorities
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    public Long getUserId() {
        return userId;
    }

    @Override
    public String getName() {
        return String.valueOf(userId);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return userPw;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
