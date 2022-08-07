package com.ssafy.drinkus.common;

import com.ssafy.drinkus.chat.domain.Chat;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ChatEvent extends ApplicationEvent {

    private Chat chat;
    private String pushToken;

    public ChatEvent(Object source) {
        super(source);
    }

    public static ChatEvent create(Chat chat, String pushToken) {
        ChatEvent chatEvent = new ChatEvent(chat);
        chatEvent.chat = chat;
        chatEvent.pushToken = pushToken;
        return chatEvent;
    }

}