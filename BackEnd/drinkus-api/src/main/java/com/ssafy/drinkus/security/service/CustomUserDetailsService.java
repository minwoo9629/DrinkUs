package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.drinkus.common.NotFoundException.USER_NOT_FOUND;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    //회원정보를 불러오고 회원정보를 받아서 반환
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println(userId);
        User findUser = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(findUser.getUserRole())));

        LoginUserDetails loginUserDetails = new LoginUserDetails(findUser.getUserName(), "", authorities);
        loginUserDetails.setUser(findUser);
        return loginUserDetails;
    }
}
