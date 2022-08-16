package com.ssafy.drinkus.security.handler;

import com.ssafy.drinkus.auth.domain.Auth;
import com.ssafy.drinkus.auth.domain.AuthRepository;
import com.ssafy.drinkus.common.LoginBlockException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.type.TokenType;
import com.ssafy.drinkus.security.service.UserPrincipal;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class CustomSimpleRulAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

//    private final String AUTHENTICATION_REDIRECT_URI = "https://i7b306.p.ssafy.io/oauth2/redirect";
    private final String AUTHENTICATION_REDIRECT_URI = "https://i7b306.p.ssafy.io/social/redirect";
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    private final AuthRepository authRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        String accessToken = jwtUtil.createToken(userPrincipal.getUserId(), TokenType.ACCESS_TOKEN);
        String refreshToken = jwtUtil.createToken(userPrincipal.getUserId(), TokenType.REFRESH_TOKEN);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        response.addHeader("AccessToken", accessToken);
        response.addHeader("RefreshToken", refreshToken);

        String target = UriComponentsBuilder.fromUriString(AUTHENTICATION_REDIRECT_URI)
                .queryParam("accesstoken", accessToken)
                .queryParam("refreshtoken", refreshToken)
                .build().toString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
