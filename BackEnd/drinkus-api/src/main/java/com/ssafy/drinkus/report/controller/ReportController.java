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
}
