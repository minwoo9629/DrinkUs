package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.interest.domain.Category;
import com.ssafy.drinkus.interest.domain.CategoryRepository;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.room.domain.RoomRepository;
import com.ssafy.drinkus.room.query.RoomQueryRepository;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

import static com.ssafy.drinkus.common.NotFoundException.CATEGORY_NOT_FOUND;
import static com.ssafy.drinkus.common.NotFoundException.USER_NOT_FOUND;
import static com.ssafy.drinkus.common.NotMatchException.USER_NOT_MATCH;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomQueryRepository roomQueryRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    //화상방 상세 조회
    public RoomInfoResponse findByRoomId(Long roomId){
        //아이디를 통해 화상방정보를 조회해온다
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        return RoomInfoResponse.from(room);
    }

    //화상방 리스트 전체 조회
    public Page<RoomListResponse> findBySearchRequest(User user, RoomSearchRequest request, Pageable pageable){
        Page<Room> findRoomList = roomQueryRepository.findBySearchCondition(
                request.getSearchKeyword(),
                request.getSameAge(),
                request.getSortOrder(),
                request.getCategory().getCategoryId(),
                pageable,
                user);

        return findRoomList.map(room -> RoomListResponse.from(room));
    }

    //화상방 생성
    @Transactional
    public void createRoom(User user, RoomCreateRequest request){
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Category findCategory = categoryRepository.findById(request.getCategory().getCategoryId())
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
        Room room = Room.createRoom(
                request.getRoomName(),
                findUser,
                request.getRoomPw(),
                request.getPlaceTheme(),
                request.getPeopleLimit(),
                request.getAges20(),
                request.getAges30(),
                request.getAges40(),
                request.getAges50(),
                request.getAges60(),
                request.getAges70(),
                findCategory
        );
        roomRepository.save(room);
    }


    //화상방 수정
    @Transactional
    public void updateRoom(User user, Long roomId, RoomUpdateRequest request){
        Room findroom = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));

        Category findCategory = categoryRepository.findById(request.getCategory().getCategoryId())
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));

        if(!user.getUserId().equals(findroom.getUser().getUserId())){
            throw new NotMatchException(USER_NOT_MATCH);
        }

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
                findCategory
        );
    }

    @Transactional
    //화상방 삭제
    public void deleteRoom(User user, Long roomId){
        Room findroom = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        if(!user.getUserId().equals(findroom.getUser().getUserId())){
            throw new NotMatchException(USER_NOT_MATCH);
        }
        roomRepository.deleteById(roomId);
    }
}