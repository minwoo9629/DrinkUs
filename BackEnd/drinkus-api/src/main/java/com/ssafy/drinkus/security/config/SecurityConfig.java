package com.ssafy.drinkus.security.config;

import com.ssafy.drinkus.security.filter.JwtAuthenticationFilter;
import com.ssafy.drinkus.security.filter.JwtAuthorizationFilter;
import com.ssafy.drinkus.security.handler.CustomAccessDeniedHandler;
import com.ssafy.drinkus.security.handler.CustomAuthenticationEntryPoint;
import com.ssafy.drinkus.security.service.CustomOAuth2UserService;
import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration //설정파일임을 알려줌
@RequiredArgsConstructor // final이 달려있는 애들만
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터 체인에 등록이 됨
// 보안관련 설정사항들이 있음
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // 소셜로그인
    private final CustomOAuth2UserService customOAuth2UserService;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/docs/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter())
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), jwtUtil, userRepository))
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/ws-stomp/**", "/api/port", "/actuator/health").permitAll()
//                .antMatchers(HttpMethod.POST,  "/users/join").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll() // 테스트 끝나면 지우기
//                .anyRequest().hasAnyRole("USER", "ADMIN")
                .anyRequest().permitAll()  // 테스트 끝나면 지우거나 authenticated()로 변경
                .and()
                // 여기부터 소셜로그인용 security 설정.
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                        // 인증에 성공할 시 JWT 발행
                        String token = jwtUtil.createToken(authentication);
                        response.addHeader("Authorization", "Bearer " + token);
                        String targetUrl = "/auth/success";
                        RequestDispatcher dis = request.getRequestDispatcher(targetUrl);
                        dis.forward(request, response);
                    }
                })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                        // 실패할 시 에러 인증 실패 에러 전송
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                    }
                });
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean //수동bean 등록
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
