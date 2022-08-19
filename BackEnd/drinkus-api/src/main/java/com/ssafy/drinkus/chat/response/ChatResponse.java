package com.ssafy.drinkus.chat.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.drinkus.chat.domain.Chat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private Long userId;

    private String userNickname;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;

    public static ChatResponse from(Chat chat){
        return new ChatResponse(chat.getUserId(), chat.getUserNickname(), chat.getContent(), LocalDateTime.now());
    }
}
