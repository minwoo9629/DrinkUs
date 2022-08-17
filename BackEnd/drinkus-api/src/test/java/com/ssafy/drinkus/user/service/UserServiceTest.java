package com.ssafy.drinkus.user.service;

import com.ssafy.drinkus.auth.domain.AuthRepository;
import com.ssafy.drinkus.common.DuplicateException;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.email.service.EmailService;
import com.ssafy.drinkus.user.domain.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.mail.MessagingException;
import java.util.Optional;

import static com.ssafy.drinkus.user.UserFixture.*;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private BCryptPasswordEncoder passwordEncoder;
    @Mock
    private EmailService emailService;
    @Mock
    private AuthRepository authRepository;

    @Test
    @DisplayName("회원가입을 성공한다")
    void createUser() {
        // given
        given(userRepository.existsByUserName(any()))
                .willReturn(FALSE);
        given(userRepository.save(any()))
                .willReturn(TEST_USER);
        given(passwordEncoder.encode(any()))
                .willReturn(TEST_PASSWORD);

        // when
        userService.createUser(TEST_USER_CREATE_REQUEST);

        //then
        then(userRepository).should(times(1))
                .existsByUserName(any());
        then(userRepository).should(times(1))
                .save(any());
        then(passwordEncoder).should(times(1))
                .encode(any());
    }

    @Test
    @DisplayName("같은 이름으로 가입된 회원이 있으면 회원가입이 실패한다")
    void createUserException() {
        // given
        given(userRepository.existsByUserName(any()))
                .willReturn(TRUE);

        // when
        assertThatThrownBy(() -> userService.createUser(TEST_USER_CREATE_REQUEST))
                .isInstanceOf(DuplicateException.class);

        //then
        then(userRepository).should(times(1))
                .existsByUserName(any());
    }


    @Test
    @DisplayName("같은 이름으로 가입된 회원이 없으면 로그인이 실패한다")
    void loginUserException() {
        //given
        given(userRepository.findByUserName(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.loginUser(TEST_USER_LOGIN_REQUEST))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findByUserName(any());
    }


    @Test
    @DisplayName("회원정보 수정을 성공한다")
    void updateUser() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));

        //when
        userService.updateUser(TEST_ID,TEST_USER_UPDATE_PROFILE_REQUEST);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원번호로 조회되는 회원이 없으면 회원정보 수정이 실패한다")
    void updateUserException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.updateUser(TEST_USER.getUserId(), TEST_USER_UPDATE_PROFILE_REQUEST))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("비밀번호 수정을 성공한다")
    void updatePassword() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));
        given(passwordEncoder.matches(any(),any()))
                .willReturn(TRUE);

        //when
        userService.updatePassword(TEST_ID, TEST_USER_UPDATE_PASSWORD_REQUEST);

        //then
        then(userRepository).should(times(1))
                .findById(any());
        then(passwordEncoder).should(times(1))
                .matches(any(),any());
    }

    @Test
    @DisplayName("회원번호로 조회되는 회원이 없으면 비밀번호 수정이 실패한다")
    void updatePasswordException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.updatePassword(TEST_USER.getUserId(), TEST_USER_UPDATE_PASSWORD_REQUEST))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("아이디찾기에 성공한다")
    void findByUserName() {
        //given
        given(userRepository.existsByUserName(any()))
                .willReturn(FALSE);

        //when
        userService.findByUserName(TEST_USER_DUPLICATE_CHECK_ID_REQUEST);

        //then
        then(userRepository).should(times(1))
                .existsByUserName(any());
    }

    @Test
    @DisplayName("회원이름으로 조회되는 회원이 없으면 아이디찾기에 실패한다")
    void findByUserNameException() {
        //given
        given(userRepository.existsByUserName(any()))
                .willReturn(TRUE);

        //when
        assertThatThrownBy(() -> userService.findByUserName(TEST_USER_DUPLICATE_CHECK_ID_REQUEST))
                .isInstanceOf(DuplicateException.class);

        //then
        then(userRepository).should(times(1))
                .existsByUserName(any());
    }

    @Test
    @DisplayName("닉네임 중복 검사에 성공한다")
    void findByUserNickname() {
        //given
        given(userRepository.existsByUserNickname(any()))
                .willReturn(FALSE);

        //when
        userService.findByUserNickname(TEST_NICKNAME);

        //then
        then(userRepository).should(times(1))
                .existsByUserNickname(any());
    }

    @Test
    @DisplayName("회원이름으로 조회된 회원이 없으면 닉네임 중복 검사에 실패한다")
    void findByUserNicknameException() {
        //given
        given(userRepository.existsByUserNickname(any()))
                .willReturn(TRUE);

        //when
        assertThatThrownBy(() -> userService.findByUserNickname(TEST_NICKNAME))
                .isInstanceOf(DuplicateException.class);

        //then
        then(userRepository).should(times(1))
                .existsByUserNickname(any());
    }

    @Test
    @DisplayName("인기도 수정에 성공한다")
    void updatePopularity() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));

        //when
        userService.updatePopularity(TEST_USER, TEST_ID, TEST_POPULARNUM);

        //then
        then(userRepository).should(times(2))
                .findById(any());
    }

    @Test
    @DisplayName("회원정보로 조회되는 회원이 없으면 인기도 수정에 실패한다")
    void updatePopularityException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.updatePopularity(TEST_USER, TEST_ID, TEST_POPULARNUM))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("프로필 조회에 성공한다")
    void findUserProfile() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));

        //when
        userService.findUserProfile(TEST_ID);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원번호로 조회되는 회원이 없으면 프로필 조회에 실패한다")
    void findUserProfileException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.findUserProfile(TEST_ID))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원 내정보 조회에 성공한다")
    void findUserMyInfo() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));

        //when
        userService.findUserMyInfo(TEST_ID);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원정보로 조회되는 회원이 없으면 회원 내정보 조회에 성공한다")
    void findUserMyInfoException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.findUserProfile(TEST_ID))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원 삭제에 성공한다")
    void deleteUser() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));

        //when
        userService.deleteUser(TEST_ID);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("회원번호로 조회되는 회원정보가 없으면 회원 삭제에 실패한다")
    void deleteUserException() {
        //given
        given(userRepository.findById(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.deleteUser(TEST_ID))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findById(any());
    }

    @Test
    @DisplayName("비번 재설정 및 이메일 발송에 성공한다")
    void resetPw() throws MessagingException {
        //given
        given(userRepository.findByUserName(any()))
                .willReturn(Optional.of(TEST_USER));
        given(passwordEncoder.encode(any()))
                .willReturn(TEST_PASSWORD);

        //when
        userService.resetPw(TEST_USER_FIND_PW_REQUEST);
        emailService.sendResetPwEmail(TEST_NAME, TEST_PASSWORD);

        //then
        then(userRepository).should(times(1))
                .findByUserName(any());
        then(passwordEncoder).should(times(1))
                .encode(any());
    }

    @Test
    @DisplayName("회원번호로 조회되는 회원정보가 없으면 비번 재설정 및 이메일 발송에 실패한다")
    void resetPwException() {
        //given
        given(userRepository.findByUserName(any()))
                .willReturn(Optional.empty());

        //when
        assertThatThrownBy(() -> userService.resetPw(TEST_USER_FIND_PW_REQUEST))
                .isInstanceOf(NotFoundException.class);

        //then
        then(userRepository).should(times(1))
                .findByUserName(any());
    }
}