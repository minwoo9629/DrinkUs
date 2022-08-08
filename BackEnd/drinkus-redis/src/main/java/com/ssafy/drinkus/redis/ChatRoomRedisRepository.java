package com.ssafy.drinkus.redis;


import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Getter
public class ChatRoomRedisRepository {

    private Map<Long, Map<String, Long>> chatRoomUsers = new ConcurrentHashMap<>();
    private Map<String, Long> sessionRooms = new ConcurrentHashMap<>();

    // 방안에 유저 추가
    public void addChatRoomUser(Long roomId, String sessionId, Long userId) {
        Map<String, Long> users = chatRoomUsers.get(roomId);
        if(users == null){
            users = new ConcurrentHashMap<>();
            chatRoomUsers.put(roomId, users);
        }
        users.put(sessionId, userId);
    }

    //방안에 유저 삭제
    public void deleteChatRoomUser(Long roomId, String sessionId) {
        Map<String, Long> users = chatRoomUsers.get(roomId);
        users.remove(sessionId);
    }

    // 방 삭제
    public void deleteChatRoom(List<Long> roomIds){
        roomIds.forEach(roomId -> chatRoomUsers.remove(roomId));
    }

    //방추가
    public void addSessionRoom(String sessionId, Long roomId) {
        sessionRooms.put(sessionId, roomId);
    }

    //방 세션 삭제
    public void deleteSessionRoom(String sessionId) {
        sessionRooms.remove(sessionId);
    }

    // 방 세션 가져오기
    public Long getRoomBySession(String sessionId) {
        return sessionRooms.get(sessionId);
    }

    //방안의 유저들 가져오기
    public List<Long> getChatRoomUsers(Long roomId){
        Map<String, Long> users = chatRoomUsers.get(roomId);
        return new ArrayList<>(users.values());
    }

}