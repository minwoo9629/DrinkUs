package com.ssafy.drinkus.game.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.game.query.TopicQueryRepository;
import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.room.domain.Topic;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.drinkus.util.RandomUtil.makeRandomTopic;
import static com.ssafy.drinkus.util.RandomUtil.makeRandomDrinkUserId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameService {
    private final TopicQueryRepository topicQueryRepository;
    private final UserRepository userRepository;

    private final Map<Long, Map<String, Long>> ROOMS = new HashMap<>(); // 방 번호, 방에 있는 유저의 세션ID
    private final Map<String, Long> SESSION_USER_ID = new HashMap<>(); // 해당 세션 ID에 해당하는 USER_ID
    private final Map<String, Long> SESSION_ROOM_ID = new HashMap<>(); // 해당 세션 ID가 참여해있는 방 정보

    public String findByCategoryId(Long categoryId) {
        List<Topic> findTopicList = topicQueryRepository.findByCategoryId(categoryId);
        List<String> topicList = findTopicList.stream()
                .map(Topic::getTopicContent)
                .collect(Collectors.toList());
        return makeRandomTopic(topicList);
    }

    public BombResponse findByRoomId() {
        int second = (int) (Math.random() * 8) + 3;
        int clickCount = second * 2;
        return new BombResponse(second, clickCount);
    }

    public UserMyInfoResponse findByUserId(Long userId) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return UserMyInfoResponse.from(findUser);
    }

    public String findUserByRoomId(Long roomId) {
        System.out.println("roomId = " + roomId);
        Map<String, Long> usersInRoom = ROOMS.get(roomId);
        Long userId = makeRandomDrinkUserId(usersInRoom);
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        return findUser.getUserNickname();
    }

    public void onConnect(Long userId, Long roomId, String sessionId) {
        // 접속했을 때
        if (!ROOMS.containsKey(roomId)) { // 방이 없었으면 새로 생성해줘야함
            ROOMS.put(roomId, new HashMap<>());
        }
        ROOMS.get(roomId).put(sessionId, userId);
        SESSION_USER_ID.put(sessionId, userId);
        SESSION_ROOM_ID.put(sessionId, roomId);
    }

    public void onDisconnect(String sessionId) {
        Long roomId = SESSION_ROOM_ID.get(sessionId);
        if (ROOMS.containsKey(roomId)) {
            ROOMS.get(roomId).remove(sessionId); // 방에서 사용자 제거
            if (ROOMS.get(roomId).size() == 0) {
                ROOMS.remove(roomId);  // 남아있는 사용자가 한 명도 없으면 방도 제거
                System.out.println(roomId + " 번 방 제거됨");
            }
            System.out.println("사용자 정보 삭제중");
        }
        SESSION_USER_ID.remove(sessionId); // USERID 정보도 제거
        SESSION_ROOM_ID.remove(sessionId);
        System.out.println("사용자 정보 삭제 완료");
    }

}
