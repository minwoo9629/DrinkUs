package com.ssafy.drinkus.report.response;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.report.domain.Report;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportInfoResponse {

    private Long reportId;
    private Long fromUserId;
    private String fromUserName;
    private Long toUserId;
    private String toUserName;
    private String reportType;
    private String reportReason;

    @Enumerated(EnumType.STRING)
    private YN reportCompleted;
    private String reportResult;

    public static ReportInfoResponse from(Report report){
        return new ReportInfoResponse(
                report.getReportId(),
                report.getFromUser().getUserId(),
                report.getFromUser().getUserName(),
                report.getToUser().getUserId(),
                report.getToUser().getUserName(),
                report.getReportType(),
                report.getReportReason(),
                report.getReportCompleted(),
                report.getReportResult()
        );
    }
}
