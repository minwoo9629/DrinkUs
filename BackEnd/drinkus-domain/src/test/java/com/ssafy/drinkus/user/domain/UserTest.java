package com.ssafy.drinkus.user.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;


class UserTest {

    @Test
    @DisplayName("회원을 생성한다.")
    void createUser() {
        //given
        String userName = "ssafy1234&ssafy.com";
        String userEmail = "ssafy1234&ssafy.com";
        String userPw = "Ssafy1234&";
        String userFullname = "한싸피";
        String userNickname = "팔씨름에서 이긴 야생토끼";
        Integer userPopularity = 50;
        Integer userPopularityLimit = 5; // 5 -> 0
        String userBirthday = "20220814";
        String userIntroduce = "안녕하세요! 반갑습니다";
        String userImg = "image.png";

        //when
        User result = User.createUser(userName, userPw, userFullname, userBirthday, userEmail);

        //then
        assertThat(result.getUserName()).isEqualTo(userName);
        assertThat(result.getUserEmail()).isEqualTo(userEmail);
        assertThat(result.getUserPw()).isEqualTo(userPw);
        assertThat(result.getUserFullname()).isEqualTo(userFullname);
        assertThat(result.getUserBirthday()).isEqualTo(userBirthday);
        assertThat(result.getUserEmail()).isEqualTo(userName);

    }

    @Test
    void testCreateUser() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void updateUserPassword() {
    }

    @Test
    void updatePopularity() {
    }

    @Test
    void updatePopularityLimit() {
    }

    @Test
    void updateFcmToken() {
    }
}