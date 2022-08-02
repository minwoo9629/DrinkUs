package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.security.oauth.OAuth2UserInfo;
import com.ssafy.drinkus.security.oauth.OAuth2UserInfoFactory;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
// 소셜 로그인 사용자 분류를 위한 서비스
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getUserEmail())) {
            throw new NotFoundException("불러온 이메일이 존재하지 않습니다.");
        }

        // 고유 아이디를 이용하여 가입 여부를 조회
        Optional<User> userOptional = userRepository.findByUserName(oAuth2UserInfo.getUserName());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }


    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserProvider userProvider = UserProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        String userEmail = oAuth2UserInfo.getUserEmail();
        String userProviderId = oAuth2UserInfo.getUserProviderId();
        String userName = oAuth2UserInfo.getUserName();

        User user = User.createUser(userProvider, userProviderId, userName, userEmail);

        return userRepository.save(user);
    }
}
