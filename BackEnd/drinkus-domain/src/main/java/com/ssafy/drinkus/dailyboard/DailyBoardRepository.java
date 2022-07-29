package com.ssafy.drinkus.dailyboard;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DailyBoardRepository extends JpaRepository<DailyBoard,Long> {

    // 글 번호로 글 찾기
    Optional<DailyBoard> findByBoardId(Long boardId);

    // 작성자로 글 찾기
    List<DailyBoard> findByCreaterId(Long createrId);


}
