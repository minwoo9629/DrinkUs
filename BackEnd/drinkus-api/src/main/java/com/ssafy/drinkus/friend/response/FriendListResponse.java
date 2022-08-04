package com.ssafy.drinkus.friend.response;

import com.ssafy.drinkus.friend.domain.Friend;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendListResponse {
    private Long friendId;
    private Long fromUserId;
    private String fromUserNickName;
    private Boolean fromUserOnline;
    private Long toUserId;
    private String toUserNickName;
    private Boolean toUserOnline;

    public static FriendListResponse from(Friend friend, Boolean fromUserOnline, Boolean toUserOnline){
        return new FriendListResponse(
                friend.getFriendId(),
                friend.getFromUser().getUserId(),
                friend.getFromUser().getUserNickname(),
                fromUserOnline,
                friend.getToUser().getUserId(),
                friend.getToUser().getUserNickname(),
                toUserOnline
                );
    }
}
