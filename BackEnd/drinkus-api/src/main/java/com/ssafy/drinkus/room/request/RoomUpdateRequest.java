package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomUpdateRequest {
    //방번호
    @NotNull(message = "방번호는 필수 값입니다.")
    private Long roomId;

    //방이름
    @NotNull(message = "이름은 필수 값입니다.")
    private String roomName;

    //방장
    private String roomAdminId;

    // 비밀번호
    private String roomPw;

    // 장소
    private String placeTheme;

    // 인원
    @NotNull(message = "참가 최대인원은 필수 값입니다.")
    @Size(min = 1, max = 8)
    private Integer peopleLimit;

    // 연령대
    @Pattern(regexp = "^[YN]$")
    private YN ages20;

    @Pattern(regexp = "^[YN]$")
    private YN ages30;

    @Pattern(regexp = "^[YN]$")
    private YN ages40;

    @Pattern(regexp = "^[YN]$")
    private YN ages50;

    @Pattern(regexp = "^[YN]$")
    private YN ages60;

    @Pattern(regexp = "^[YN]$")
    private YN ages70;

    //관심사
    private Category categoryFirst;

    private Category categorySecond;

    private Category categoryThird;
}
