package com.ssafy.drinkus.auth.service;

import com.ssafy.drinkus.auth.Auth;
import com.ssafy.drinkus.auth.AuthRepository;
import com.ssafy.drinkus.auth.request.TokenRequest;
import com.ssafy.drinkus.auth.response.TokenResponse;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.RefreshTokenException;
import com.ssafy.drinkus.common.type.TokenType;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AuthRepository authRepository;

    @Transactional
    public TokenResponse reissue(TokenRequest request){
        // 만료된 refresh token 에러
        if(!jwtUtil.isValidToken(request.getRefreshToken())){
            throw new RefreshTokenException("리프레시 토큰이 만료되었습니다.");
        }

        // AccessToken에서 user pk 가져오기
        String accessToken = request.getAccessToken();
        Authentication authentication = jwtUtil.getAuthentication(accessToken);

        // user pk로 유저 검색 / repository에 저장된 RefreshToken이 없음
        User findUser = userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        Auth auth = authRepository.findByUserId(findUser.getUserId())
                .orElseThrow(() -> new RefreshTokenException("리프레시 토큰이 없습니다."));

        // 리프레시 토큰 불일치 에러
        if(!auth.getRefreshToken().equals(request.getRefreshToken()))
            throw new RefreshTokenException("리프레시 토큰이 일치하지 않습니다.");

        // AccessToken, RefreshToken 재발급, 리프레시 토큰 저장
        TokenResponse newCreatedToken = new TokenResponse(
                jwtUtil.createToken(findUser.getUserId(), TokenType.ACCESS_TOKEN),
                jwtUtil.createToken(findUser.getUserId(), TokenType.REFRESH_TOKEN)
        );
        Auth updateAuth = auth.updateRefreshToken(newCreatedToken.getRefreshToken());
        authRepository.save(updateAuth);

        return newCreatedToken;
    }
}
