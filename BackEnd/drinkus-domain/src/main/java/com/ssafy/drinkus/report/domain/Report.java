package com.ssafy.drinkus.report.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Report extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    private String reportType; // 신고 분류

    private String reportReason; // 신고 사유 (텍스트)

    @Enumerated(EnumType.STRING)
    private YN reportCompleted; // 신고 처리 완료 여부

    private String reportResult; // 신고 처리 내용

    public static Report createReport(User fromUser, User toUser, String reportType, String reportReason) {
        Report report = new Report();
        report.fromUser = fromUser;
        report.toUser = toUser;
        report.reportType = reportType;
        report.reportReason = reportReason;
        report.reportCompleted = YN.N;
        report.reportResult = null;
        return report;
    }

    public void updateReport(YN reportCompleted, String reportResult){
        this.reportCompleted = reportCompleted;
        this.reportResult = reportResult;
    }
}
