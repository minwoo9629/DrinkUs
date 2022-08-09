package com.ssafy.drinkus.friend.domain;

import com.ssafy.drinkus.chat.domain.Chat;
import com.ssafy.drinkus.chat.domain.ChatRoom;
import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Friend extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long friendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    //채팅방 아이디
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    //친구 관계 생성
    public static Friend createFriend(User fromUser, User toUser, ChatRoom chatRoom) {
        Friend friend = new Friend();
        friend.fromUser = fromUser;
        friend.toUser = toUser;
        friend.chatRoom = chatRoom;
        return friend;
    }
}
