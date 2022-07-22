package com.ssafy.drinkus.security.util;

import com.ssafy.drinkus.security.service.UserPrincipal;
import com.ssafy.drinkus.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private long expirationTime;

    // 원래 UserId로 받던 부분을 로그인 시 전달되는 authentication으로 처리
    public String createToken(Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        LocalDateTime localDateTime = LocalDateTime.now();
        long sec = expirationTime / 1000;
        localDateTime = localDateTime.plusSeconds(sec);
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Date expireDate = Date.from(localDateTime.atZone(defaultZoneId).toInstant());

        String token = Jwts.builder()
                .setSubject(Long.toString(principal.getUserNo()))
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, secretKey).compact();

        return token;
    }

    public String getSubject(String jwtToken) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody().getSubject();
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
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

}
