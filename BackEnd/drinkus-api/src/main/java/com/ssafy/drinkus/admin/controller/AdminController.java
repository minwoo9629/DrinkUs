package com.ssafy.drinkus.admin.controller;


import com.ssafy.drinkus.admin.request.AdminReportSearchRequest;
import com.ssafy.drinkus.admin.service.AdminService;
import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.report.request.ReportUpdateRequest;
import com.ssafy.drinkus.report.response.ReportInfoResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.response.UserListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    // 전체 사용자 조회
    @GetMapping("/user/list")
    public ResponseEntity<List<UserListResponse>> findAllUser(@LoginUser User user){
        List<UserListResponse> body = adminService.findAllUser(user);
        return ResponseEntity.ok().body(body);
    }

    // 사용자에게 관리자 권한 부여
    @PatchMapping("/permission/{user_id}")
    public ResponseEntity<Void> updateAdminPermission(@LoginUser User user, @PathVariable("user_id")Long userId){
        adminService.updateAdminPermission(user, userId);
        return ResponseEntity.ok().build();
    }

    // 회원 삭제
    @DeleteMapping("/{user_id}")
    public ResponseEntity<Void> deleteUser(@LoginUser User user, @PathVariable("user_id") Long deleteUserId) {
        adminService.deleteUser(user, deleteUserId);
        return ResponseEntity.ok().build();
    }


    // 신고내역 전체 조회
    @GetMapping("/report")
    public ResponseEntity<List<ReportInfoResponse>> findAllReport(@LoginUser User user){
        List<ReportInfoResponse> body = adminService.findAll(user);
        return ResponseEntity.ok().body(body);
    }

    // 특정 유저에 대한 신고 내역 조회
    @PostMapping("/report/user")
    public ResponseEntity<List<ReportInfoResponse>> findReportByToUser(@LoginUser User user, @RequestBody AdminReportSearchRequest request){
        List<ReportInfoResponse> body = adminService.findByToUser(user, request.getToUserName());
        return ResponseEntity.ok().body(body);
    }

    // 신고내역 처리
    @PutMapping("/report")
    public ResponseEntity<Void> updateReport(@LoginUser User user, @RequestBody @Valid ReportUpdateRequest request){
        adminService.updateReport(user, request);
        return ResponseEntity.ok().build();
    }

    // 신고내역 삭제
    @DeleteMapping("/report/{report_id}")
    public ResponseEntity<Void> deleteReport(@LoginUser User user, @PathVariable("report_id")Long reportId){
        adminService.deleteReport(user, reportId);
        return ResponseEntity.ok().build();
    }
}
