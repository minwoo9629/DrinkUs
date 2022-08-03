package com.ssafy.drinkus.friend.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.friend.domain.Friend;
import com.ssafy.drinkus.friend.domain.FriendRepository;
import com.ssafy.drinkus.friend.response.FriendListResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    //친구 추가
    @Transactional
    public void createFriend(User fromUser, Long toUserId){
        User findToUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        Friend friend = Friend.createFriend(fromUser, findToUser);
        friendRepository.save(friend);
    }

    //Todo 현재 접속여부 만들기
    //회원의 친구 리스트 조회
    public List<FriendListResponse> findByFromUserId(User user){
        List<Friend> friends = friendRepository.findByFromUser(user.getUserId());

        return friends.stream()
                .map(friend -> FriendListResponse.from(friend,true,true))
                .collect(Collectors.toList());
    }

    //친구 삭제
    @Transactional
    public void deleteFriend(User FromUser, Long toUserId) {
        User findToUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        friendRepository.deleteFriendByFromUserAndToUser(FromUser,findToUser);
    }

}
