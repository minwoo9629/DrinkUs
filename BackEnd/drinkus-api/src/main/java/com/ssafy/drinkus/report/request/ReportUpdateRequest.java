package com.ssafy.drinkus.report.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportUpdateRequest {
    private Long reportId; // 신고내역 번호
    private String reportResult; // 신고 처리 결과
    private Long stopPeriod; // 정지 기간
}
