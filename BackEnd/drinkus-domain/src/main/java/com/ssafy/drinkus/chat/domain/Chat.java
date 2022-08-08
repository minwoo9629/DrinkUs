package com.ssafy.drinkus.chat.domain;

import com.ssafy.drinkus.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;

    private Long userId;

    private String sender;

    private String content;

    private Long roomId;

    public static Chat createChat(Long chatId, Long userId, String sender, String content, Long roomId){
        Chat chat = new Chat();
        chat.chatId = chatId;
        chat.userId = userId;
        chat.sender = sender;
        chat.content = content;
        chat.roomId = roomId;
        return chat;
    }
}
