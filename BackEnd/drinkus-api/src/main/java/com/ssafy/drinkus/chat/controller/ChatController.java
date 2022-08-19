package com.ssafy.drinkus.chat.controller;

import com.ssafy.drinkus.chat.request.ChatRequest;
import com.ssafy.drinkus.chat.response.ChatResponse;
import com.ssafy.drinkus.chat.service.ChatService;
import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final JwtUtil jwtUtil;
    private final SimpMessageSendingOperations messagingTemplate;

    //해당방의 채팅내역 조회 (페이징)
    @GetMapping("/{room_id}/messages")
    public ResponseEntity<List<ChatResponse>> findByRoomId(@PathVariable Long chatRoomId,
                                                           @PageableDefault(size = 50, page = 0) Pageable pageable,
                                                           @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(chatService.findByRoomId(chatRoomId, pageable, lastMessageDate));
    }

    @MessageMapping("/chat/message")
    public void sendMessage(ChatRequest request, @Header(HttpHeaders.AUTHORIZATION) String bearerToken) {
        Long userId = jwtUtil.getUserId(bearerToken.substring(7));
        String userNickName = jwtUtil.getNickName(bearerToken.substring(7));

        ChatResponse messageResponse = chatService.createChat(userId, userNickName, request);
        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), messageResponse);
    }
}
