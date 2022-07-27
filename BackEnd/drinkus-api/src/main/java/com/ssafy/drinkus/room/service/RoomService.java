package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.room.Room;
import com.ssafy.drinkus.room.RoomRepository;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    //화상방 상세 조회
    public RoomInfoResponse findByRoomId(Long roomId){
        //아이디를 통해 화상방정보를 조회해온다
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return RoomInfoResponse.from(room);
    }

    //화상방 리스트 전체 조회
//    public List<RoomListResponse> findBySearchRequest(RoomSearchRequest request){
//        Room room = roomRepository.findById(request.)
//                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
//        return RoomListResponse.from(room);
//    }

    //화상방 생성
    public void createRoom(RoomCreateRequest request){
    }

    //화상방 수정
    public void updateRoom(RoomUpdateRequest request){}

    //화상방 삭제
    public void updateRoomActive(Long roomId){

    }

}
