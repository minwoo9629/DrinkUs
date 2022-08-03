package com.ssafy.drinkus.chat.controller;

import com.ssafy.drinkus.chat.response.MessageResponse;
import com.ssafy.drinkus.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

//    @GetMapping("/{room_id}/messages")
//    public ResponseEntity<Slice<MessageResponse>> findByRoomId(@PathVariable Long chatRoomId,
//                                                               @PageableDefault(size = 50, page = 0) Pageable pageable,
//                                                               @RequestParam String lastMessageDate) {
//        return ResponseEntity.ok(chatService.findByRoomId(chatRoomId, pageable, lastMessageDate));
//    }
}
