package com.ssafy.drinkus.report.service;

import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.report.domain.Report;
import com.ssafy.drinkus.report.domain.ReportRepository;
import com.ssafy.drinkus.report.request.ReportCreateRequest;
import com.ssafy.drinkus.report.request.ReportUpdateRequest;
import com.ssafy.drinkus.report.response.ReportInfoResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    // 신고내역 등록 (for User)
    @Transactional
    public void createReport(User fromUser, ReportCreateRequest request){
        User toUser = userRepository.findById(request.getToUserId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        Report report = Report.createReport(fromUser, toUser, request.getReportType(), request.getReportReason());
        reportRepository.save(report);
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
