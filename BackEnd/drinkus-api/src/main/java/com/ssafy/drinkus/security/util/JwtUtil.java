package com.ssafy.drinkus.security.util;

import com.ssafy.drinkus.common.type.TokenType;
import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT 토큰 생성을 위한 클래스
 */
@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${token.secret}")
    private String secretKey;

    @Value("${token.expiration_time}")
    private long accessTokenExpirationTime;

    @Value("${token.refresh_token_expiration_time}")
    private long refreshTokenExpirationTime;
    private final CustomUserDetailsService customUserDetailsService;

    // 원래 UserId로 받던 부분을 로그인 시 전달되는 authentication으로 처리
    public String createToken(Long userId, TokenType tokenType) {
        long expirationTime = (tokenType == TokenType.ACCESS_TOKEN) ? accessTokenExpirationTime : refreshTokenExpirationTime;
        Date now = new Date();

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Authentication getAuthentication(String token){
        // Jwt에서 claims 호출
        Claims claims = getClaims(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(claims.getSubject()); // UserDetails? UserPrincipal?
        return new UsernamePasswordAuthenticationToken(userDetails, "",userDetails.getAuthorities());
    }

    public String getSubject(String jwtToken) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody().getSubject();
    }

    public Long getUserId(String token) {
        String userId = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().getSubject();
        return Long.valueOf(userId);
    }

    public String getRole(String token){
        Claims body = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody();
        return body.get("ROLE", String.class);
    }

    public String getNickName(String token){
        Claims body = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody();
        return body.get("userNickname", String.class);
    }

    public boolean isValidToken(String jwtToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        try{
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }
}
