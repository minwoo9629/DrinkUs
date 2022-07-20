package com.ssafy.drinkus.security.config;

import com.ssafy.drinkus.security.config.oauth.PrincipalOauth2UserService;
import com.ssafy.drinkus.security.filter.JwtAuthenticationFilter;
import com.ssafy.drinkus.security.handler.CustomAccessDeniedHandler;
import com.ssafy.drinkus.security.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration //설정파일임을 알려줌
@RequiredArgsConstructor // final이 달려있는 애들만
// 보안관련 설정사항들이 있음
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;

    // 소셜로그인
    private final PrincipalOauth2UserService PrincipalDetailsService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/docs/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/ws-stomp/**", "/api/port", "/actuator/health").permitAll()
                .antMatchers(HttpMethod.POST, "/api/users", "/api/users/login").permitAll()
                .anyRequest().hasAnyRole("USER", "ADMIN")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // 여기부터 소셜로그인용 security 설정.
                .oauth2Login()
                // .loginPage()  만약에 위에서 로그인 했을때 필터링해줄게 있다면 여기에서도 설정해주자
                .userInfoEndpoint()
                .userService(PrincipalDetailsService); // 소셜 로그인 완료된 이후의 후처리 (OAuth2UserService 타입)
        ; // 이어서 코드작성 . . .
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
}
