package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomUpdateRequest {
    //방이름
    @NotBlank(message = "이름은 필수 값입니다.")
    private String roomName;

    //방장
    private String roomAdminId;

    // 비밀번호
    private String roomPw;

    // 장소
    private String placeTheme;

    // 인원
    @NotNull(message = "참가 최대인원은 필수 값입니다.")
    private Integer peopleLimit;

    // 연령대
    private YN ages20;

    private YN ages30;

    private YN ages40;

    private YN ages50;

    private YN ages60;

    private YN ages70;

    //관심사
    private CategoryResponse category;
}