package com.ssafy.drinkus.chat.controller;

import com.ssafy.drinkus.chat.request.ChatRequest;
import com.ssafy.drinkus.chat.response.MessageResponse;
import com.ssafy.drinkus.chat.service.ChatService;
import com.ssafy.drinkus.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final JwtUtil jwtUtil;
    private final SimpMessageSendingOperations messagingTemplate;

    //해당방의 채팅내역 조회 (페이징)
//    @GetMapping("/{room_id}/messages")
//    public ResponseEntity<Slice<MessageResponse>> findByRoomId(@PathVariable Long chatRoomId,
//                                                               @PageableDefault(size = 50, page = 0) Pageable pageable,
//                                                               @RequestParam String lastMessageDate) {
//        return ResponseEntity.ok(chatService.findByRoomId(chatRoomId, pageable, lastMessageDate));
//    }

//    @MessageMapping("/chat/message")
//    public void sendMessage(ChatRequest request, @Header(HttpHeaders.AUTHORIZATION) String bearerToken) {
//        Long userId = jwtUtil.getUserId(bearerToken.substring(7));
//        String sender = jwtUtil.getNickName(bearerToken.substring(7));
//
//        MessageResponse messageResponse = messageService.sendMessage(userId, sender, request);
//        messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), messageResponse);
//    }
}
