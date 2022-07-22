package com.ssafy.drinkus.security.service;

import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        Optional<User> oUser = userRepository.findByUserId(userId);

        System.out.println("oUser = " + oUser.get());

        User user = oUser
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + userId));

        return UserPrincipal.create(user);
    }
}
