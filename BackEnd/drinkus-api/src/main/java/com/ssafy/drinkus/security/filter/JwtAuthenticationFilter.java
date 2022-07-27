package com.ssafy.drinkus.security.filter;

import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import com.ssafy.drinkus.security.service.LoginUserDetails;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final  JwtUtil jwtUtil;
    private  UserRepository userRepository;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String jwtToken = extractToken((HttpServletRequest) request);

        if (StringUtils.hasText(jwtToken) && jwtUtil.isValidToken(jwtToken)) {
            //authService에서 회원정보를 받음
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtUtil.getSubject(jwtToken));
            LoginUserDetails loginUserDetails = (LoginUserDetails) userDetails;

            // 회원 인증 객체안에 회원정보가 들어있음
            // thread로컬 안에 객체를 넣음
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(loginUserDetails.getUser(), null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }

    // TOKEN 추출
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}