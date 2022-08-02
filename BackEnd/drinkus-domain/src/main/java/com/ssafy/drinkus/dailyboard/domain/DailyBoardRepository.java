package com.ssafy.drinkus.dailyboard.domain;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DailyBoardRepository extends JpaRepository<DailyBoard,Long> {

    // 글 번호로 글 찾기
    Optional<DailyBoard> findByBoardId(Long boardId);

    // 원글 찾기
    List<DailyBoard> findByParentIdIsNull(Pageable page);

    // 데일리 게시판 총 원글 개수
    Long countByParentIdIsNull();

    // 원글 번호로 댓글 찾기
    List<DailyBoard> findByParentId(Long parentId);

    // 원글에 대한 댓글 모두 지우기
    void deleteByParentId(Long parentId);
    
    // 해당 작성자에 대한 총 글 개수
    Long countByCreater(User craeter);

    // 내가 쓴 글 조회
    List<DailyBoard> findByCreater(User creater, Pageable page);
    
    // 전체 글 삭제
    void deleteAll();

}
