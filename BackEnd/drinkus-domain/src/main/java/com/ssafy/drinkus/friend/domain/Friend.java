package com.ssafy.drinkus.friend.domain;

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

    //친구 관계 생성
    public static Friend createFriend(User fromUser, User toUser) {
        Friend friend = new Friend();
        friend.fromUser = fromUser;
        friend.toUser = toUser;
        return friend;
    }
}
