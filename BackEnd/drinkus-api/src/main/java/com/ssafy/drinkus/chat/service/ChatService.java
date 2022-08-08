package com.ssafy.drinkus.chat.service;

import com.ssafy.drinkus.chat.domain.Chat;
import com.ssafy.drinkus.chat.domain.ChatRepository;
import com.ssafy.drinkus.chat.domain.ChatRoomRepository;
import com.ssafy.drinkus.chat.request.ChatRequest;
import com.ssafy.drinkus.chat.response.ChatResponse;
import com.ssafy.drinkus.chat.domain.ChatRoom;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.redis.ChatRoom.ChatRoomRedisRepository;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.drinkus.common.NotFoundException.CHAT_ROOM_NOT_FOUND;
import static com.ssafy.drinkus.common.NotFoundException.USER_NOT_FOUND;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRedisRepository chatRoomRedisRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    //친구 수락시 채팅방 생성 User user.getuserId, userId
    @Transactional
    public Long createChatRoom(Long userOneId, Long userTwoId){
        User findUserOne = userRepository.findById(userOneId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        User findUserTwo = userRepository.findById(userTwoId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        ChatRoom chatRoom = ChatRoom.createChatRoom(findUserOne, findUserTwo);
        return chatRoomRepository.save(chatRoom).getChatRoomId();
    }

    //친구 삭제시 채팅방 삭제
    @Transactional
    public void deleteChatRoom(Long userId, Long roomId) {
        ChatRoom findChatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(CHAT_ROOM_NOT_FOUND));

        if (!findChatRoom.getUserOne().getUserId().equals(userId) && !findChatRoom.getUserTwo().getUserId().equals(userId)) {
            throw new AccessDeniedException("");
        }
        chatRoomRepository.delete(findChatRoom);
    }

    // 이용자가 채팅하기 눌렀을때
    //채팅 내역 가져오기 (페이징)
    public List<ChatResponse> findByRoomId(Long roomId, Pageable pageable, String lastMessageDate){
        List<Chat> chats = chatRepository.findAllByRoomIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(roomId, LocalDateTime.parse(lastMessageDate), pageable);
        return chats.stream()
                .map(ChatResponse::from)
                .collect(Collectors.toList());
    }

    //채팅 생성 (채팅하기)
    @Transactional
    public ChatResponse createChat(Long userId, String userNickName, ChatRequest request){
        Chat chat = Chat.createChat(request.getRoomId(), userId, userNickName, request.getContent());
        chatRepository.save(chat);

        List<Long> userIds = chatRoomRedisRepository.getChatRoomUsers(request.getRoomId());
        return ChatResponse.from(chat);
    }


}
