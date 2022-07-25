package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> oUser = userRepository.findByUserName(userName);

        User user = oUser
                .orElseThrow(() ->
                        new UsernameNotFoundException("해당 userName의 회원은 존재하지 않습니다. : " + userName)
                );

        return UserPrincipal.create(user);
    }
}
