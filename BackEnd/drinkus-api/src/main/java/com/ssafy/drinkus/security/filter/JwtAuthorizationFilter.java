package com.ssafy.drinkus.security.filter;

import com.ssafy.drinkus.security.service.UserPrincipal;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;


@Component
// BasicAuthenticationFilter에 기본 생성자가 없어서 이 형식으로는 상속 못받음
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private  JwtUtil jwtUtil;
    private  UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader("Authorization");

        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }
        // If header is present, try grab user principal from database and perform authorization
        Authentication authentication = getUsernamePasswordAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Continue filter execution
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization")
                .replace("Bearer", "");

        if (token != null) {
            Claims claims = jwtUtil.getClaims(token);
            Long id = Long.parseLong(claims.getSubject()); // getSubject 값은 users의 userid값

            if (id != null) {
                Optional<User> oUser = userRepository.findByUserId(id);
                User user = oUser.get();
                UserPrincipal principal = UserPrincipal.create(user);

                // OAuth 인지 일반 로그인인지 구분할 필요가 없음. 왜냐하면 password를 Authentication이 가질 필요가 없으니!!
                // JWT가 로그인 프로세스를 가로채서 인증다 해버림. (OAuth2.0이든 그냥 일반 로그인 이든)

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication); // 세션에 넣기
                return authentication;
            }
        }
        return null;
    }
}
