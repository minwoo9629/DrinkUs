package com.ssafy.drinkus.friend.domain;

import com.ssafy.drinkus.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend,Long> {
    @Query("select f from Friend f where f.fromUser.userId =:userId or f.toUser.userId =:userId")
    List<Friend> findByFromUser(@Param("userId") Long userId);

    Integer deleteFriendByFromUserAndToUser(User fromUser, User toUser);
}
