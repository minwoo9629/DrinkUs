package com.ssafy.drinkus.report.domain;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report,Long> {

    // 특정 유저 신고내역 조회
    List<Report> findByToUserOrderByReportIdDesc(User toUser);

    // 신고 내역 삭제
    void deleteByReportId(Long reportId);

    // 신고 처리 여부 확인
    @Query("select count (r.reportId) > 0 " +
            "from Report r " +
            "where r.fromUser.userId = :fromUserId and r.toUser.userId = :toUserId and r.reportCompleted = 'N'")
    boolean existsByFromUserAndToUser(
            @Param(value = "fromUserId") Long fromUserId,
            @Param(value = "toUserId") Long toUserId
            );
}
