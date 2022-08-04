package com.ssafy.drinkus.room.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.room.service.RoomService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rooms")
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

    //화상방 퇴장

    //화상방 강퇴

}
