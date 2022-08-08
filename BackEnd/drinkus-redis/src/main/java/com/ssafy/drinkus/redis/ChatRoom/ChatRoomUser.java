package com.ssafy.drinkus.redis.ChatRoom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("chatRoomUser")
public class ChatRoomUser {
    @Id
    private Long roomId;

    private Long userOne;

    private Long userTwo;

    public static ChatRoomUser createChatRoomUser(Long roomId, Long userOne, Long userTwo){
        ChatRoomUser chatRoomUser = new ChatRoomUser();
        chatRoomUser.roomId = roomId;
        chatRoomUser.userOne = userOne;
        chatRoomUser.userTwo = userTwo;
        return chatRoomUser;
    }
}
