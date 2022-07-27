package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class RoomCreateRequest {
    // 방이름
    @NotNull(message = "이름은 필수 값입니다.")
    private String roomName;

    // 방장
    private String roomAdminId;

    // 비밀번호
    private String roomPW;

    // 장소
    private String placeTheme;

    // 인원
    @NotNull(message = "참가 최대인원은 필수 값입니다.")
    @Size(min = 1, max = 8)
    private Integer peopleLimit;

    // 연령대
    @Pattern(regexp = "^[YN]$")
    private String ages20;

    @Pattern(regexp = "^[YN]$")
    private String ages30;

    @Pattern(regexp = "^[YN]$")
    private String ages40;

    @Pattern(regexp = "^[YN]$")
    private String ages50;

    @Pattern(regexp = "^[YN]$")
    private String ages60;

    @Pattern(regexp = "^[YN]$")
    private String ages70;

    //관심사
    private String interestFirst;

    private String interestSecond;

    private String interestThird;
}
