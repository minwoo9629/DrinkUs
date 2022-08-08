package com.ssafy.drinkus.security.handler;

import com.ssafy.drinkus.redis.ChatRoomRedisRepository;
import com.ssafy.drinkus.redis.LoginUser;
import com.ssafy.drinkus.redis.LoginUserRepository;
import com.ssafy.drinkus.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final ChatRoomRedisRepository chatRoomRedisRepository;
    private final LoginUserRepository loginUserRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // 스톰프 연결
        if (StompCommand.CONNECT == accessor.getCommand()) {
            if (!jwtUtil.isValidToken(extractToken(accessor))) {
                throw new AccessDeniedException("연결 거부");
            }
            Long userId = jwtUtil.getUserId(extractToken(accessor));
            String userNickName = jwtUtil.getNickName(extractToken(accessor));

            LoginUser loginUser = LoginUser.createLoginUser(userId, userNickName);
            loginUserRepository.save(loginUser);
        }
        // 채팅방 구독
        else if(StompCommand.SUBSCRIBE == accessor.getCommand()){
            Long userId = jwtUtil.getUserId(extractToken(accessor));

            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            String sessionId = (String) message.getHeaders().get("simpSessionId");

            //방안에 유저 추가
            chatRoomRedisRepository.addChatRoomUser(Long.valueOf(roomId), sessionId, userId);
            //방세션 추가
            chatRoomRedisRepository.addSessionRoom(sessionId, Long.valueOf(roomId));
        }
        // 웹소켓 연결 종료
        else if(StompCommand.DISCONNECT == accessor.getCommand()){
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            Long roomId = chatRoomRedisRepository.getRoomBySession(sessionId);
            //방안에 유저 삭제
            chatRoomRedisRepository.deleteChatRoomUser(roomId, sessionId);
            //세션 삭제
            chatRoomRedisRepository.deleteSessionRoom(sessionId);

            Long userId = jwtUtil.getUserId(extractToken(accessor));
            Optional<LoginUser> loginUser = loginUserRepository.findById(userId);
            loginUserRepository.delete(loginUser.get());
        }
        return message;
    }

    private String extractToken(StompHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader("AccessToken");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf("/");
        return destination.substring(lastIndex + 1);
    }
}
