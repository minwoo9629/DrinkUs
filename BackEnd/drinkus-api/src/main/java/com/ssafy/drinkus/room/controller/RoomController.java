package com.ssafy.drinkus.room.controller;

import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    //화상방 상세조회
    @GetMapping("/{room_id}")
    //RoomInfoResponse
    public ResponseEntity<Void> findByRoomId(@PathVariable Long roomId){
        roomService.findByRoomId(roomId);
        return ResponseEntity.ok().build();
    }

    //화상방 리스트 전체 조회
    @GetMapping
    //List<RoomInfoResponse>
    public ResponseEntity<Void> findBySearchRequest(@Valid RoomSearchRequest request){
        roomService.findBySearchRequest(request);
        return ResponseEntity.ok().build();
    }

    //화상방 생성
    @PostMapping
    public ResponseEntity<Void> createRoom(@RequestBody @Valid RoomCreateRequest request){
        roomService.createRoom(request);
        return ResponseEntity.ok().build();
    }

    //화상방 수정
    @PutMapping
    public ResponseEntity<Void> updateRoom(@RequestBody @Valid RoomUpdateRequest request) {
        roomService.updateRoom(request);
        return ResponseEntity.ok().build();
    }

    //화상방 삭제 -> 비활성화
    @PutMapping("/disable/{room_Id}")
    public ResponseEntity<Void> updateRoomActive(@PathVariable Long roomId){
        roomService.updateRoomActive(roomId);
        return ResponseEntity.ok().build();
    }
}
