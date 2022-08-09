package com.ssafy.drinkus.report.service;

import com.ssafy.drinkus.common.AuthenticationException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotProcessedException;
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

        //처리되지 않았는데 재신고를 하는지 확인
        if(reportRepository.existsByFromUserAndToUser(fromUser.getUserId(), toUser.getUserId())){
            throw new NotProcessedException(NotProcessedException.NOT_PROCESSED_REPORT);
        }

        Report report = Report.createReport(fromUser, toUser, request.getReportType(), request.getReportReason());
        reportRepository.save(report);
    }
}
