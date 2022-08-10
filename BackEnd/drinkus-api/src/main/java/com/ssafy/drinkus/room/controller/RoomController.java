package com.ssafy.drinkus.room.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.room.request.*;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.room.service.RoomService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    //화상방 상세조회
    @GetMapping("/{room_id}")
    public ResponseEntity<RoomInfoResponse> findByRoomId(@PathVariable("room_id") Long roomId){
        RoomInfoResponse body = roomService.findByRoomId(roomId);
        return ResponseEntity.ok().body(body);
    }

    // localhost:8080/members?page=0&size=3&sort=createdDate,asc
    //화상방 리스트 전체 조회
    //페이징
    @GetMapping
    public ResponseEntity<Page<RoomListResponse>> findBySearchRequest(@LoginUser User user,
                                                                      @Valid RoomSearchRequest request,
                                                                      @PageableDefault Pageable pageable){
        Page<RoomListResponse> body = roomService.findBySearchRequest(user, request, pageable);
        return ResponseEntity.ok().body(body);
    }

    // 내 나이대로 설정된 방 최대 8개
    @GetMapping("/recommend/ages")
    public ResponseEntity<List<RoomListResponse>> findRoomBySameAges(@LoginUser User user){
        List<RoomListResponse> body = roomService.findBySameAges(user);
        return ResponseEntity.ok().body(body);
    }

    // 관심사가 [내 관심사 중 소주제로 제일 많이 고른 대주제, 개수 똑같은거 있으면 랜덤 하나]로 설정된 방
    @GetMapping("/recommend/category")
    public ResponseEntity<List<RoomListResponse>> findRoomBySameInterest(@LoginUser User user){
        List<RoomListResponse> body = roomService.findBySameInterest(user);
        return ResponseEntity.ok().body(body);
    }

    // 지금 막 생성된 방 최대 8개 (지난 1시간 이내 기준)
    @GetMapping("/recommend/current")
    public ResponseEntity<List<RoomListResponse>> findRoomByCurrentTime(@LoginUser User user){
        List<RoomListResponse> body = roomService.findByCurrentTime(user);
        return ResponseEntity.ok().body(body);
    }

    //화상방 생성
    @PostMapping
    public ResponseEntity<Void> createRoom(@LoginUser User user, @RequestBody @Valid RoomCreateRequest request){
        roomService.createRoom(user, request);
        return ResponseEntity.ok().build();
    }

    //화상방 수정
    @PutMapping("/{room_id}")
    public ResponseEntity<Void> updateRoom(@LoginUser User user,
                                           @PathVariable("room_id") Long roomId,
                                           @RequestBody @Valid RoomUpdateRequest request) {
        roomService.updateRoom(user, roomId, request);
        return ResponseEntity.ok().build();
    }

    //화상방 삭제
    @DeleteMapping("/{room_id}")
    public ResponseEntity<Void> deleteRoom(@LoginUser User user, @PathVariable("room_id") Long roomId){
        roomService.deleteRoom(user, roomId);
        return ResponseEntity.ok().build();
    }

    //화상방 참가
    @PostMapping("/join")
    public ResponseEntity<Void> joinRoom(@LoginUser User user, @RequestBody RoomJoinRequest joinRoomRequest){
        System.out.println("## Join Room Controller");
        return null;
    }

    //화상방 퇴장
    @PatchMapping("/exit")
    public ResponseEntity<Void> exitRoom(@LoginUser User user, @RequestBody RoomExitRequest exitRoomRequest){
        System.out.println("## Exit Room Controller");
        return null;
    }

    //화상방 강퇴



}
