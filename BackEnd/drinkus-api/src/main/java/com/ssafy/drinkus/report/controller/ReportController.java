package com.ssafy.drinkus.report.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.report.request.ReportCreateRequest;
import com.ssafy.drinkus.report.request.ReportUpdateRequest;
import com.ssafy.drinkus.report.response.ReportInfoResponse;
import com.ssafy.drinkus.report.service.ReportService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    // 신고 등록
    @PostMapping
    public ResponseEntity<Void> createReport(@LoginUser User user, @RequestBody @Valid ReportCreateRequest request){
        reportService.createReport(user, request);
        return ResponseEntity.ok().build();
    }

    // 신고내역 전체 조회
    @GetMapping
    public ResponseEntity<List<ReportInfoResponse>> findAll(@LoginUser User user){
        List<ReportInfoResponse> body = reportService.findAll(user);
        return ResponseEntity.ok().body(body);
    }

    // 특정 유저에 대한 신고 내역 조회
    @GetMapping("/{to_user_id}")
    public ResponseEntity<List<ReportInfoResponse>> findByToUser(@LoginUser User user, @PathVariable("to_user_id")Long toUserId){
        List<ReportInfoResponse> body = reportService.findByToUser(user, toUserId);
        return ResponseEntity.ok().body(body);
    }

    // 신고내역 처리
    @PutMapping("")
    public ResponseEntity<Void> updateReport(@LoginUser User user, @RequestBody @Valid ReportUpdateRequest request){
        reportService.updateReport(user, request);
        return ResponseEntity.ok().build();
    }

    // 신고내역 삭제
    @DeleteMapping("/{report_id}")
    public ResponseEntity<Void> deleteReport(@LoginUser User user, @PathVariable("report_id")Long reportId){
        reportService.deleteReport(user, reportId);
        return ResponseEntity.ok().build();
    }
}
