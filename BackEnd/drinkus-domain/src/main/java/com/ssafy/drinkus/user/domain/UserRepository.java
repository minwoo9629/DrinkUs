package com.ssafy.drinkus.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //아이디로 회원 찾기
    Optional<User> findByUserId(String userId);

    //회원번호로 회원 찾기
    Optional<User> findByUserNo(Long userNo);
}
