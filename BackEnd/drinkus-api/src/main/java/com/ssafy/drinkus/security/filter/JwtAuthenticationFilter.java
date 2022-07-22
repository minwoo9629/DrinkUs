package com.ssafy.drinkus.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.request.UserLoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

// 사용자에게 권한이 있는지 확인하기 위한 필터
@Component
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 로그인하려는 유저에게 권한이 있는지 확인
        UserLoginRequest credentials = null;

        try {
            credentials = new ObjectMapper().readValue(request.getInputStream(), UserLoginRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 지금 어디는 userId고 어디는 email로 되어있어서 조금 개같은데 빠른 수정 요망
        // request로부터 읽어들인 로그인 정보를 바탕으로 존재하는 유저인지 판단
        Optional<User> oUser = userRepository.findByUserId(credentials.getEmail());
        User user = oUser.get();

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUserId());
        // 유효한 유저에 대한 로그인 토큰을 생성한다.
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, credentials.getPw());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication); // 인증 완료된 후 세션에 넣는다.

        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // 토큰 생성 후 발행
        String token = jwtUtil.createToken(authResult);
        response.addHeader("Authorization", "Bearer " + token);
    }
}
