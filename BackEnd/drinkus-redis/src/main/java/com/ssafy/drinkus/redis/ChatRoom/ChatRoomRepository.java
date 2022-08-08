package com.ssafy.drinkus.redis.ChatRoom;

import org.springframework.data.repository.CrudRepository;

public interface ChatRoomRepository extends CrudRepository<ChatRoomUser,Long> {
        }
