package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.domain.oauth.OAuth2UserInfo;
import com.ssafy.drinkus.user.domain.oauth.OAuth2UserInfoFactory;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
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

    private static UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        return super.loadUser(oAuth2UserRequest);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        if (StringUtils.isEmpty(oAuth2UserInfo.getUserId())) {
            throw new NotFoundException("불러온 이메일이 존재하지 않습니다.");
        }

        Optional<User> userOptional = userRepository.findByUserId(oAuth2UserInfo.getUserId());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getUserProvider().equals(UserProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                // 이미 존재하는 회원 -> 로그인
            } else {
                user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
            }
        }

        return null;
//        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }


    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UseRInfo) {
        UserProvider userProvider = UserProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        String userName = oAuth2UseRInfo.getUserName();
        String userId = oAuth2UseRInfo.getUserId();
        User user = User.createUser(userProvider, userId, userName);

        return userRepository.save(user);
    }
}
