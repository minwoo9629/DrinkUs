package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.category.domain.CategoryRepository;
import com.ssafy.drinkus.category.domain.SubCategory;
import com.ssafy.drinkus.category.domain.SubCategoryRepository;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.room.domain.RoomHistory;
import com.ssafy.drinkus.room.domain.RoomHistoryRepository;
import com.ssafy.drinkus.room.domain.RoomRepository;
import com.ssafy.drinkus.room.query.RoomQueryRepository;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomJoinRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.domain.UserSubCategory;
import com.ssafy.drinkus.user.domain.UserSubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
    private final SubCategoryRepository subCategoryRepository;
    private final UserSubCategoryRepository userSubCategoryRepository;
    private final UserRepository userRepository;
    private final RoomHistoryRepository roomHistoryRepository;

    private final BCryptPasswordEncoder passwordEncoder;

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
                request.getCategoryId(),
                pageable,
                user);

        return findRoomList.map(RoomListResponse::from);
    }

    //화상방 추천 - 같은 나이대
    public List<RoomListResponse> findBySameAges(User user){
        // 나이 변환
        StringBuilder sb = new StringBuilder(user.getUserBirthday());
        sb.insert(6, "-");
        sb.insert(4, "-");
        LocalDate birthday = LocalDate.parse(sb.toString());
        LocalDate today = LocalDate.now();
        int age = today.getYear() - birthday.getYear();

        // 같은 나이대로 설정된 방 찾기
        List<Room> list;
        switch (age / 10){
            case 2 :
                list = roomRepository.findTop8ByAges20OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
            case 3 :
                list = roomRepository.findTop8ByAges30OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
            case 4 :
                list = roomRepository.findTop8ByAges40OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
            case 5 :
                list = roomRepository.findTop8ByAges50OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
            case 6 :
                list = roomRepository.findTop8ByAges60OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
            default :
                list = roomRepository.findTop8ByAges70OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("해당 나이대의 방이 없습니다."));
                break;
        }
        List<RoomListResponse> response = new ArrayList<>();
        for (Room room : list) {
            RoomListResponse res = RoomListResponse.from(room);
            res.setConnectedUserNum(roomHistoryRepository.countPeopleInRoom(room.getRoomId()));
            response.add(res);
        }
        return response;
    }

    //화상방 추천 - 내 관심사
    public List<RoomListResponse> findBySameInterest(User user){
        Map<Integer, Integer> map = new HashMap<>(); // 대분류이름, 점수
        List<UserSubCategory> userSubCategoryList = userSubCategoryRepository.findByUser(user);
        for(UserSubCategory ct : userSubCategoryList){
            //user_subcategory_id로 sub_category를 찾는다.
            //Long categoryId = subCategoryRepository.findBySubCategoryId(ct.getSubCategory().getSubCategoryId());
//            if(map.containsKey(category.getCategoryName())){
//                map.put(category.getCategoryName(), map.get(category.getCategoryName()) + 1);
//            } else {
//                map.put(category.getCategoryName(), 1);
//            }

        }
//
//        // 가장 큰 value값을 가진 키(대분류 이름)를 찾는다.
//        String maxKey = map.keySet().stream()
//                .max(Comparator.comparing(map::get))
//                .orElse(null);
//        System.out.println("###### " + maxKey);

        // 해당 대분류에 해당하는 방들을 찾는다.

        //
        return null;
    }

    //화상방 추천 - 지금 막 생성된 방
    public List<RoomListResponse> findByCurrentTime(User user){
        int currentTime = 48;
        List<Room> list = roomRepository.findTop8ByCreatedDateAfterOrderByCreatedDateDesc(LocalDateTime.now().minusHours(currentTime))
                .orElseThrow(() -> new NotFoundException("방이 존재하지 않습니다."));

        List<RoomListResponse> response = new ArrayList<>();
        for (Room room : list) {
            RoomListResponse res = RoomListResponse.from(room);
            res.setConnectedUserNum(roomHistoryRepository.countPeopleInRoom(room.getRoomId()));
            response.add(res);
        }
        return response;
    }

    //화상방 생성
    @Transactional
    public void createRoom(User user, RoomCreateRequest request){
        Category findCategory = null;
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if(request.getCategoryId() != null){
            findCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
        }
        else {
            findCategory = null;
        }
        Room room = Room.createRoom(
                request.getRoomName(),
                findUser,
                passwordEncoder.encode(request.getRoomPw()),
                request.getPlaceTheme(),
                request.getPeopleLimit(),
                request.getAges(),
                findCategory
        );
        roomRepository.save(room);

        //방 히스토리에 저장
        RoomHistory roomHistory = RoomHistory.createRoomHistory(room, findUser);
        roomHistoryRepository.save(roomHistory);
    }

    //화상방 수정
    @Transactional
    public void updateRoom(User user, Long roomId, RoomUpdateRequest request){
        Category findCategory = null;
        Room findroom = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));

        if(request.getCategoryId() != null){
            findCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
        }
        else {
            findCategory = null;
        }
        if(!user.getUserId().equals(findroom.getUser().getUserId())){
            throw new NotMatchException(USER_NOT_MATCH);
        }

        findroom.updateRoom(
                request.getRoomName(),
                request.getRoomPw(),
                request.getPeopleLimit(),
                request.getAges(),
                findCategory
        );
    }

    @Transactional
    //화상방 삭제
    public void deleteRoom(User user, Long roomId){
        Room findroom = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        if(!user.getUserId().equals(findroom.getUser().getUserId())){
            throw new NotMatchException(USER_NOT_MATCH);
        }
        roomRepository.deleteById(roomId);
        RoomHistory findRoomHistory = roomHistoryRepository.findById(findroom.getRoomId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        findRoomHistory.updateRoomHistory(findroom, user);
    }

    @Transactional
    // 화상방 입장
    public void joinRoom(User user, RoomJoinRequest request){
        // 유저 아이디로 유저 정보 얻어온다
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        // target room 정보 얻어온다
//        Room findRoom = roomRepository.findById(request.getRoomId());
    }

    @Transactional
    // 화상방 퇴장
    public void exitRoom(User user){

    }
}
