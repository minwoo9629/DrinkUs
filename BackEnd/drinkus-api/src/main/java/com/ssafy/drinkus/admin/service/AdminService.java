package com.ssafy.drinkus.admin.service;

import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.report.domain.Report;
import com.ssafy.drinkus.report.domain.ReportRepository;
import com.ssafy.drinkus.report.request.ReportUpdateRequest;
import com.ssafy.drinkus.report.response.ReportInfoResponse;
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
        List<UserListResponse> response = new ArrayList<>();
        for (User u : userList) {
            response.add(UserListResponse.from(u));
        }
        return response;
    }

    // 회원에게 관리자 권한 부여
    @Transactional
    public void updateAdminPermission(User user, Long targetUserId){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 권한을 부여할 수 있습니다.");
        }
        userRepository.updateUserRole(UserRole.ROLE_ADMIN, targetUserId);
    }

    // 신고내역 전체 조회 (for Admin)
    public List<ReportInfoResponse> findAll(User user){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 조회할 수 있습니다.");
        }

        List<Report> results = reportRepository.findAll(Sort.by(Sort.Direction.DESC, "reportId"));

        List<ReportInfoResponse> response = new ArrayList<>();
        for (Report r : results) {
            response.add(ReportInfoResponse.from(r));
        }
        return response;
    }

    // 특정 유저에 대한 신고내역 조회 (for Admin)
    public List<ReportInfoResponse> findByToUser(User user, Long toUserId){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 조회할 수 있습니다.");
        }

        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        List<Report> results = reportRepository.findByToUserOrderByReportIdDesc(toUser);

        List<ReportInfoResponse> response = new ArrayList<>();
        for (Report r : results) {
            response.add(ReportInfoResponse.from(r));
        }
        return response;
    }

    // 신고내역 처리 (for Admin)
    @Transactional
    public void updateReport(User user, ReportUpdateRequest request){
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 처리할 수 있습니다.");
        }

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
        if(user.getUserRole() != UserRole.ROLE_ADMIN){
            throw new AuthenticationException("관리자만 신고내역을 삭제할 수 있습니다.");
        }
        reportRepository.deleteByReportId(reportId);
    }
}
