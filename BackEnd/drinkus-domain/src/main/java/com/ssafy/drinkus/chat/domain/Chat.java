package com.ssafy.drinkus.chat.domain;

import antlr.debug.MessageEvent;
import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.ChatEvent;
import com.ssafy.drinkus.friend.domain.Friend;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.AbstractAggregateRoot;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends AbstractAggregateRoot<Chat> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;

    private Long roomId;

    private Long userId;

    private String userNickname;

    private String content;

    @CreatedDate
    private LocalDateTime createdAt;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "friend_id")
    private Friend friend;

    public static Chat createChat(Long roomId, Long userId, String userNickname, String content){
        Chat chat = new Chat();
        chat.roomId = roomId;
        chat.userId = userId;
        chat.userNickname = userNickname;
        chat.content = content;
        return chat;
    }

    public Chat send(String pushToken) {
        this.registerEvent(ChatEvent.create(this, pushToken));
        return this;
    }
}
