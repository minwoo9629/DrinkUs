package com.ssafy.drinkus.security.filter;

import com.ssafy.drinkus.security.service.AuthService;
import com.ssafy.drinkus.security.service.UserPrincipal;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@RequiredArgsConstructor
// Generic Filter 대신 UsernamePasswordAuthenticationFilter로 상속받으면 아래 할 필요 없음
// .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
public class JwtAuthenticationFilter extends GenericFilter {

    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final UserRepository userRepository;

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        String jwtToken = extractToken((HttpServletRequest) request);

        if (StringUtils.hasText(jwtToken) && jwtUtil.isValidToken(jwtToken)) {
            //authService에서 회원정보를 받음
            UserDetails userDetails = authService.loadUserByUsername(jwtUtil.getSubject(jwtToken));
            UserPrincipal principalDetails = (UserPrincipal) userDetails;

            // 회원 인증 객체안에 회원정보가 들어있음
            // thread로컬 안에 객체를 넣음
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userRepository.findByUserId(principalDetails.getUserId()), null, userDetails.getAuthorities());
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
