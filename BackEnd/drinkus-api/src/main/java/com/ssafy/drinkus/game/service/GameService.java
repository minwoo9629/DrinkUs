package com.ssafy.drinkus.game.service;

import com.ssafy.drinkus.game.response.BombResponse;
import com.ssafy.drinkus.user.response.UserMyInfoResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameService {
    public String findByCategoryId(Long categoryId){
        String topic = "";
        return topic;
    }

    public BombResponse findByRoomId(){
        BombResponse bombResponse = null;
        return bombResponse;
    }

    public UserMyInfoResponse findByUserId(Long userId){
        UserMyInfoResponse userMyInfoResponse = null;
        return userMyInfoResponse;
    }

    public UserMyInfoResponse findUserByRoomId(){
        UserMyInfoResponse userMyInfoResponse = null;
        return userMyInfoResponse;
    };
}
