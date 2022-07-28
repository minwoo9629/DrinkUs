package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.room.Room;
import com.ssafy.drinkus.room.RoomRepository;
import com.ssafy.drinkus.room.query.RoomQueryRepository;
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

import static com.ssafy.drinkus.common.NotFoundException.ROOM_NOT_FOUND;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomQueryRepository roomQueryRepository;

    //화상방 상세 조회
    public RoomInfoResponse findByRoomId(Long roomId){
        //아이디를 통해 화상방정보를 조회해온다
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        return RoomInfoResponse.from(room);
    }

    //화상방 리스트 전체 조회
//    public List<RoomListResponse> findBySearchRequest(RoomSearchRequest request){
//        List<RoomListResponse> roomSearchList = roomQueryRepository.findBySearchCondition(
//                request.getSearchKeyword(),
//                request.getSameAge(),
//                request.getSortOrder(),
//                request.getCategoryFirst(),
//                request.getCategorySecond(),
//                request.getCategoryThird()
//        );
//        return roomSearchList;
//    }

    //화상방 생성
    public void createRoom(RoomCreateRequest request){
        Room room = Room.createRoom(
                request.getRoomName(),
                request.getRoomAdminId(),
                request.getRoomPw(),
                request.getPlaceTheme(),
                request.getPeopleLimit(),
                request.getAges20(),
                request.getAges30(),
                request.getAges40(),
                request.getAges50(),
                request.getAges60(),
                request.getAges70(),
                request.getCategoryFirst(),
                request.getCategorySecond(),
                request.getCategoryThird());
        roomRepository.save(room);
    }

    //화상방 수정
    public void updateRoom(RoomUpdateRequest request){
        Room findroom = roomRepository.findByRoomId(request.getRoomId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));

        findroom.updateRoom(
                request.getRoomName(),
                request.getRoomPw(),
                request.getPeopleLimit(),
                request.getAges20(),
                request.getAges30(),
                request.getAges40(),
                request.getAges50(),
                request.getAges60(),
                request.getAges70(),
                request.getCategoryFirst(),
                request.getCategorySecond(),
                request.getCategoryThird()
        );
    }

    //화상방 삭제
    public void updateRoomActive(Long roomId){

    }

}
