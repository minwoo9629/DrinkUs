package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import com.ssafy.drinkus.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data // Getter, Setter, RequiredArgsConstructor, ToString, EqualsAndHashCode, Value
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateRequest {
    // 방이름
    @NotNull(message = "이름은 필수 값입니다.")
    private String roomName;

    // 방장
    private User roomAdminId;

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
    private CategoryResponse category;
}
