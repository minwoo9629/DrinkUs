package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomSearchRequest {
    // 검색어 (방 제목)
    private String searchKeyword;

    // 또래 체크
    private Boolean sameAge;

    // 오래된순, 최신순
    private Integer sortOrder;

    // Todo 카테고리 5개 다 선택할수 있게끔 하기 StringList(0~5)
    //관심사
    private Integer categoryFirst;

    private Integer categorySecond;

    private Integer categoryThird;
}
