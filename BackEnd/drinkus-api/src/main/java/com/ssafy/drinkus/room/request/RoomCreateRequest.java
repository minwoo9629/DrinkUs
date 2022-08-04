package com.ssafy.drinkus.room.request;

import com.ssafy.drinkus.common.type.YN;
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

    // 비밀번호
    private String roomPw;

    // 장소
    private String placeTheme;

    // 인원
    @NotNull(message = "참가 최대인원은 필수 값입니다.")
    private Integer peopleLimit;

    // 연령대
    private YN[] ages;

    //관심사
    private Long categoryId;
}
