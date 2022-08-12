package com.ssafy.drinkus.notification.controller;

import com.ssafy.drinkus.config.LoginUser;
import com.ssafy.drinkus.notification.response.NotificationResponse;
import com.ssafy.drinkus.notification.service.NotificationService;
import com.ssafy.drinkus.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    //알림리스트 조회
    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationResponse>> findTop20ByUserIdOrderByNotificationIdDesc(@LoginUser User user) {
        return ResponseEntity.ok(notificationService.findTop20ByUserIdOrderByNotificationIdDesc(user));
    }
}
