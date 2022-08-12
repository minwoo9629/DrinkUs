package com.ssafy.drinkus.admin.service;

import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.report.domain.Report;
import com.ssafy.drinkus.report.domain.ReportRepository;
import com.ssafy.drinkus.report.request.ReportUpdateRequest;
import com.ssafy.drinkus.report.response.ReportInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.domain.type.UserRole;
import com.ssafy.drinkus.user.response.UserListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    //회원 전체 조회
    public List<UserListResponse> findAllUser(User user){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 조회할 수 있습니다.");
        }

        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserListResponse::from)
                .collect(Collectors.toList());
    }

    // 회원에게 관리자 권한 부여
    @Transactional
    public void updateAdminPermission(User user, Long targetUserId){
        checkPermission(user);
        userRepository.updateUserRole(UserRole.ROLE_ADMIN, targetUserId);
    }

    // 회원 삭제
    @Transactional
    public void deleteUser(User user, Long deleteUserId) {
        checkPermission(user);
        userRepository.deleteById(deleteUserId);
    }

    // 신고내역 전체 조회 (for Admin)
    public List<ReportInfoResponse> findAll(User user){
        checkPermission(user);

        List<Report> results = reportRepository.findAll(Sort.by(Sort.Direction.DESC, "reportId"));

        return results.stream()
                .map(ReportInfoResponse::from)
                .collect(Collectors.toList());
    }

    // 특정 유저에 대한 신고내역 조회 (for Admin)
    public List<ReportInfoResponse> findByToUser(User user, Long toUserId){
        checkPermission(user);

        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        List<Report> results = reportRepository.findByToUserOrderByReportIdDesc(toUser);

        return results.stream()
                .map(ReportInfoResponse::from)
                .collect(Collectors.toList());
    }

    // 신고내역 처리 (for Admin)
    @Transactional
    public void updateReport(User user, ReportUpdateRequest request){
        checkPermission(user);

        // 신고내역 업데이트
        Report report = reportRepository.findById(request.getReportId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.REPORT_NOT_FOUND));
        report.updateReport(YN.Y, request.getReportResult());

        // 신고된 유저 stop date 업데이트
        LocalDateTime stopDeadline = LocalDateTime.now().plusDays(request.getStopPeriod());
        userRepository.updateUserStopDate(stopDeadline, report.getToUser().getUserId());
    }

    // 신고내역 삭제 (for Admin)
    @Transactional
    public void deleteReport(User user, Long reportId){
        checkPermission(user);
        reportRepository.deleteByReportId(reportId);
    }

    private void checkPermission(User user){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 조회할 수 있습니다.");
        }
    }
}
