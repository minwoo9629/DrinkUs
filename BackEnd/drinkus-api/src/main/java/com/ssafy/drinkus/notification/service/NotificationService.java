package com.ssafy.drinkus.notification.service;

import com.ssafy.drinkus.notification.domain.Notification;
import com.ssafy.drinkus.notification.domain.NotificationRepository;
import com.ssafy.drinkus.notification.response.NotificationResponse;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {
    private final NotificationRepository notificationRepository;

    //회원의 알림 리스트 조회
    public List<NotificationResponse> findTop20ByUserIdOrderByNotificationIdDesc(User user) {
        List<Notification> notificationList = notificationRepository.findTop20ByUserIdOrderByNotificationIdDesc(user.getUserId());
        return notificationList.stream()
                .map(NotificationResponse::from)
                .collect(Collectors.toList());
    }


}
