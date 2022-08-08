package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.interest.response.CategoryResponse;
import com.ssafy.drinkus.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data // Getter, Setter, RequiredArgsConstructor, ToString, EqualsAndHashCode, Value
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateRequest {
    // 방이름
    @NotBlank(message = "이름은 필수 값입니다.")
    private String roomName;

    // 방장
    private User roomAdminId;

    // 비밀번호
    private String roomPw;

    // 장소
    private String placeTheme;

    // 인원
    @NotNull(message = "참가 최대인원은 필수 값입니다.")
    private Integer peopleLimit;

    // 연령대
//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages20;

//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages30;

//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages40;

//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages50;

//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages60;

//    @NotBlank(message = "연령대는 필수 값입니다.")
//    @Pattern(regexp = "[YN]", message = "Y또는 N만 가능합니다.")
    private YN ages70;

    //관심사
    private CategoryResponse category;
}
