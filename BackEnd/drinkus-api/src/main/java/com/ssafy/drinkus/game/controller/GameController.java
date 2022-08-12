package com.ssafy.drinkus.game.controller;

import com.ssafy.drinkus.game.request.GameIdRequest;
import com.ssafy.drinkus.game.request.TopicRequest;
import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.game.service.GameService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public void findByCategoryId(TopicRequest request){
        String topic = gameService.findByCategoryId(request.getCategoryId());
        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), topic);
    }

    // 폭탄돌리기 : 폭탄돌리기가 시작됐다는 요청 받으면(room_id)
    // random 초랑 시간(초)내에 눌러야하는 클릭횟수를 보내줌
    @MessageMapping("/bomb/start/{room_id}")
    public void findByRoomId(GameIdRequest request){
        BombResponse bombStartResponse = gameService.findByRoomId();
        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), bombStartResponse);
    }

    // 폭탄 돌리기 결과 : 못누른 사람의 id를 받으면(user_id)
    // 해당 user_id의 회원 정보를 모든 사람들에게 뿌려주기
    @MessageMapping("/bomb/result/{room_id}")
    public void findByUserId( @Header(HttpHeaders.AUTHORIZATION) String bearerToken
                                            , GameIdRequest request){
        Long userId = jwtUtil.getUserId(bearerToken.substring(7));
        UserMyInfoResponse userMyInfoResponse = gameService.findByUserId(userId);
        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), userMyInfoResponse);
    }

    // 랜덤 마시기 : 랜덤 마시기가 시작됐다는 요청 받으면(room_id)
    // 방의 사람들 중에 random으로 user_id 정보를 보내기
    @MessageMapping("/random/{room_id}")
    public void findUserByRoomId(GameIdRequest request){
        UserMyInfoResponse userMyInfoResponse = gameService.findUserByRoomId();
        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), userMyInfoResponse);
    }
}