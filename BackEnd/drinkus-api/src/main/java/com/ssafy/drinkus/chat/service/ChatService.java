package com.ssafy.drinkus.chat.service;

import com.ssafy.drinkus.chat.domain.ChatRepository;
import com.ssafy.drinkus.chat.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

//    //qk
//    public Slice<MessageResponse> findByRoomId(Long roomId, Pageable pageable, String lastMessageDate){
//
//    }



}
