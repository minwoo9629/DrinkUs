package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.room.RoomRepository;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    //화상방 상세 조회
    public void findByRoomId(Long roomId){
        //아이디를 통해 화상방정보를 조회해온다
    }

    //화상방 리스트 전체 조회
    public void findBySearchRequest(RoomSearchRequest request){
        // 호
    }

    //화상방 생성
    public void createRoom(RoomCreateRequest request){}

    //화상방 수정
    public void updateRoom(RoomUpdateRequest request){}

    //화상방 삭제
    public void updateRoomActive(Long roomId){

    }

}
