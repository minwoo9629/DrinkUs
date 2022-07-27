package com.ssafy.drinkus.security.handler;

import com.ssafy.drinkus.security.service.UserPrincipal;
import com.ssafy.drinkus.security.util.JwtUtil;
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

@RequiredArgsConstructor
@Component
public class CustomSimpleRulAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final String AUTHENTICATION_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtUtil.createToken(userPrincipal.getUserId());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        response.addHeader("Authorization", token);

        String target = UriComponentsBuilder.fromUriString(AUTHENTICATION_REDIRECT_URI)
                .queryParam("token", token)
                .build().toString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
