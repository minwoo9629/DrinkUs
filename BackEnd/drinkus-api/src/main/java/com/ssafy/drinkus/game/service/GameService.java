package com.ssafy.drinkus.game.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.game.query.TopicQueryRepository;
import com.ssafy.drinkus.game.request.BombResultRequest;
import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.game.response.BombResultResponse;
import com.ssafy.drinkus.room.domain.RoomRepository;
import com.ssafy.drinkus.room.domain.Toast;
import com.ssafy.drinkus.room.domain.ToastRepository;
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
    private final ToastRepository toastRepository;
    private final RoomRepository roomRepository;

    private final Map<Long, Map<String, String>> ROOMS = new HashMap<>(); // 방 번호, 방에 있는 유저의 세션ID
    private final Map<String, Long> SESSION_USER_ID = new HashMap<>(); // 해당 세션 ID에 해당하는 USER_ID
    private final Map<String, Long> SESSION_ROOM_ID = new HashMap<>(); // 해당 세션 ID가 참여해있는 방 정보

    public String findByCategoryId(Long categoryId) {
        List<Topic> findTopicList = topicQueryRepository.findByCategoryId(categoryId);
        List<String> topicList = findTopicList.stream()
                .map(Topic::getTopicContent)
                .collect(Collectors.toList());
        return makeRandomTopic(topicList);
    }

    public String findByToastId() {
        Long tot = toastRepository.count();
        Toast toast = toastRepository.findById((long) (Math.random() * tot + 1))
                .orElseThrow(() -> new NotFoundException("존재하지 않는 건배사 번호입니다."));
        return toast.getToastContent();
    }

    public BombResponse findByRoomId() {
        int second = (int) (Math.random() * 5) + 3;
        int clickCount = second + (int) (Math.random() * second);
        return new BombResponse(second, clickCount);
    }

    public BombResultResponse findByUserId(Long userId, BombResultRequest request) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return new BombResultResponse(findUser.getUserNickname(), request.getClickCount() <= 0);
    }

    public String findUserByRoomId(Long roomId) {
        Map<String, String> usersInRoom = ROOMS.get(roomId);
        Long userId = makeRandomDrinkUserId(usersInRoom, SESSION_USER_ID);
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));

        return findUser.getUserNickname();
    }

    public void onConnect(Long userId, Long roomId, String sessionId) {
        // 접속했을 때
        if (!ROOMS.containsKey(roomId)) { // 방이 없었으면 새로 생성해줘야함
            ROOMS.put(roomId, new HashMap<>());
        }
        ROOMS.get(roomId).put(sessionId, sessionId);
        System.out.println("roomId = " + roomId);
        System.out.println("ROOMS.get(roomId).size() = " + ROOMS.get(roomId).size());
        SESSION_USER_ID.put(sessionId, userId);
        SESSION_ROOM_ID.put(sessionId, roomId);
    }

    @Transactional
    public void onDisconnect(String sessionId) {
        Long roomId = SESSION_ROOM_ID.get(sessionId);
        if (ROOMS.containsKey(roomId)) {
            ROOMS.get(roomId).remove(sessionId); // 방에서 사용자 제거
            if (ROOMS.get(roomId).size() == 0) {
                ROOMS.remove(roomId);  // 남아있는 사용자가 한 명도 없으면 방도 제거
                System.out.println("roomId = " + roomId);
                System.out.println("방 왜안없앰?");
                roomRepository.deleteById(roomId);
            }
        }
        SESSION_USER_ID.remove(sessionId); // USERID 정보도 제거
        SESSION_ROOM_ID.remove(sessionId);
    }
}
