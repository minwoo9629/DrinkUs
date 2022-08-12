package com.ssafy.drinkus.game.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.game.query.TopicQueryRepository;
import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.room.domain.Topic;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.drinkus.util.RandomUtil.makeRandomTopic;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameService {
    private final TopicQueryRepository topicQueryRepository;
    private final UserRepository userRepository;

    public String findByCategoryId(Long categoryId){
        List<Topic> findTopicList = topicQueryRepository.findByCategoryId(categoryId);
        List<String> topicList = findTopicList.stream()
                .map(Topic::getTopicContent)
                .collect(Collectors.toList());
        return makeRandomTopic(topicList);
    }

    public BombResponse findByRoomId(){
        int second = -1;
        int clickCount = second * 2;
        return new BombResponse(second, clickCount);
    }

    public UserMyInfoResponse findByUserId(Long userId){
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserMyInfoResponse.from(findUser);
    }

    public UserMyInfoResponse findUserByRoomId(){
        UserMyInfoResponse userMyInfoResponse = null;
        return userMyInfoResponse;
    };
}
