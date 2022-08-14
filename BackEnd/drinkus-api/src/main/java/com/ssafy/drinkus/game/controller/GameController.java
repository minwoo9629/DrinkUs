package com.ssafy.drinkus.game.controller;

import com.ssafy.drinkus.game.request.BombResultRequest;
import com.ssafy.drinkus.game.request.ChatMessage;
import com.ssafy.drinkus.game.request.GameIdRequest;
import com.ssafy.drinkus.game.request.TopicRequest;
import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.game.response.BombResultResponse;
import com.ssafy.drinkus.game.service.GameService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import com.ssafy.drinkus.user.response.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {
    private final JwtUtil jwtUtil;
    private final SimpMessageSendingOperations messagingTemplate;
    private final GameService gameService;

    // 대화 주제 추천 요청 : 대화 주제 요청 받으면(카테고리 아이디)
    // 카테고리아이디에 해당하는 대화주제중 1개를 random으로 보내줌
    // null -> (모두다), id -> (공통, 해당 id주제)
    @MessageMapping("/topic")
    public void findByCategoryId(TopicRequest request) {
        String topic = gameService.findByCategoryId(request.getCategoryId());
        messagingTemplate.convertAndSend("/sub/topic/" + request.getRoomId(), topic);
    }

    // 건배사 추천 요청 : DB에 있는 여러 가지 건배사 중 하나를 랜덤으로 뽑아와서 추천
    @MessageMapping("/toast")
    public void findByToastId(GameIdRequest request) {
        String toast = gameService.findByToastId();
        messagingTemplate.convertAndSend("/sub/toast/" + request.getRoomId(), toast);
    }

    // 폭탄돌리기 : 폭탄돌리기가 시작됐다는 요청 받으면(room_id)
    // random 초랑 시간(초)내에 눌러야하는 클릭횟수를 보내줌
    @MessageMapping("/bomb/start")
    public void findByRoomId(GameIdRequest request) {
        BombResponse bombStartResponse = gameService.findByRoomId();
        messagingTemplate.convertAndSend("/sub/bomb/start/" + request.getRoomId(), bombStartResponse);
    }

    // 폭탄 돌리기 결과 : 못누른 사람의 id를 받으면(user_id)
    // 해당 user_id의 회원 정보를 모든 사람들에게 뿌려주기
    @MessageMapping("/bomb/result")
    public void findByUserId(@Header(HttpHeaders.AUTHORIZATION) String bearerToken
            , BombResultRequest request) {
        Long userId = jwtUtil.getUserId(bearerToken.substring(7));
        BombResultResponse bombResultResponse = gameService.findByUserId(userId, request);
        messagingTemplate.convertAndSend("/sub/bomb/result/" + request.getRoomId(), bombResultResponse);
    }

    // 랜덤 마시기 : 랜덤 마시기가 시작됐다는 요청 받으면(room_id)
    // 방의 사람들 중에 random으로 user_id 정보를 보내기
    @MessageMapping("/random")
    public void findUserByRoomId(GameIdRequest request) {
        String userNickname = gameService.findUserByRoomId(request.getRoomId());
        messagingTemplate.convertAndSend("/sub/random/" + request.getRoomId(), userNickname);
    }

    // 해당 방에 있는 유저의 수 반환
    @GetMapping("/participants/{room_id}")
    public ResponseEntity<Integer> countByRoomId(@PathVariable("room_id") Long roomId){
        Integer body = gameService.countByRoomId(roomId);
        return ResponseEntity.ok().body(body);
    }

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String token = accessor.getNativeHeader("AccessToken").get(0);
        Long userId = token.startsWith("Bearer ") ? jwtUtil.getUserId(token.substring(7)) : null;
        gameService.onConnect(userId, Long.parseLong(accessor.getNativeHeader("roomId").get(0)), event.getMessage().getHeaders().get("simpSessionId").toString());
    }

    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        gameService.onDisconnect(event.getSessionId());
    }
}

