package com.ssafy.drinkus.chat.domain;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class ChatRoom extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_one_id")
    private User userOne;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_two_id")
    private User userTwo;

    public static ChatRoom createChatRoom(User userOne, User userTwo) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.userOne = userOne;
        chatRoom.userTwo = userTwo;
        return chatRoom;
    }
}
