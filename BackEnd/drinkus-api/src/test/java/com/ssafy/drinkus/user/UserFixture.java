package com.ssafy.drinkus.user;

import com.ssafy.drinkus.email.request.UserNameAuthRequest;
import com.ssafy.drinkus.email.request.UserNameCheckRequest;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.type.UserRole;
import com.ssafy.drinkus.user.request.*;

import static com.ssafy.drinkus.CommonFixture.TEST_EXPIRATION_TOKEN;

public class UserFixture {
    public static final Long TEST_ID = 1L;
    public static final String TEST_NAME = "ssafy1234@naver.com";
    public static final String TEST_PASSWORD = "Ssafy1234&";
    public static final String TEST_FULLNAME = "한싸피";
    public static final String TEST_BIRTHDAY = "20220819";
    public static final String TEST_NICKNAME = "한싸피이";
    public static final String TEST_INTRODUCE = "안녕하세요";
    public static final Integer TEST_SOJU = 1;
    public static final Integer TEST_BEER = 1;
    public static final Integer TEST_POPULARNUM = 10;
    public static final Integer TEST_POPULARLIMIT = 5;
    public static final String TEST_IMG = "한싸피이";
    public static final String TEST_FCM_TOKEN = "fcmToken";

    public static final User TEST_USER = new User(1L, TEST_NAME, TEST_NAME, TEST_PASSWORD, TEST_FULLNAME, TEST_NICKNAME, 1, 5, TEST_BIRTHDAY, TEST_INTRODUCE, TEST_IMG, UserRole.ROLE_USER, null, null, null, null, TEST_SOJU, TEST_BEER, TEST_FCM_TOKEN, null, null);

    public static final UserCreateRequest TEST_USER_CREATE_REQUEST
            = new UserCreateRequest(TEST_NAME, TEST_PASSWORD, TEST_FULLNAME, TEST_BIRTHDAY);

    public static final UserUpdateRequest TEST_USER_UPDATE_PROFILE_REQUEST
            = new UserUpdateRequest(TEST_NICKNAME, TEST_INTRODUCE, TEST_SOJU, TEST_BEER, TEST_IMG, TEST_BIRTHDAY, TEST_FULLNAME);

    public static final UserLoginRequest TEST_USER_LOGIN_REQUEST
            = new UserLoginRequest(TEST_NAME, TEST_PASSWORD, TEST_FCM_TOKEN);

    public static final UserUpdatePasswordRequest TEST_USER_UPDATE_PASSWORD_REQUEST
            = new UserUpdatePasswordRequest(TEST_PASSWORD, TEST_PASSWORD, TEST_PASSWORD);

    public static final UserDuplicateCheckIdRequest TEST_USER_DUPLICATE_CHECK_ID_REQUEST
             = new UserDuplicateCheckIdRequest(TEST_NAME);

    public static final  UserFindMyIdRequest TEST_USER_FIND_ID_REQUEST
            = new UserFindMyIdRequest(TEST_FULLNAME, TEST_BIRTHDAY);

    public static final UserFindMyPwRequest TEST_USER_FIND_PW_REQUEST
            = new UserFindMyPwRequest(TEST_NAME);

    public static final UserNameCheckRequest TEST_USER_NAME_CHECK_REQUEST
            = new UserNameCheckRequest(TEST_NAME);

    public static final UserNameAuthRequest TEST_USER_NAME_AUTH_REQUEST
            = new UserNameAuthRequest(TEST_NAME, TEST_EXPIRATION_TOKEN);

}
