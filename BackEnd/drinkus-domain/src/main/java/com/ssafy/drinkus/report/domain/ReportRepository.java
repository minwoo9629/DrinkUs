package com.ssafy.drinkus.report.domain;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report,Long> {

    // 특정 유저 신고내역 조회
    List<Report> findByToUserOrderByReportIdDesc(User toUser);

    // 신고 내역 삭제
    void deleteByReportId(Long reportId);
}
