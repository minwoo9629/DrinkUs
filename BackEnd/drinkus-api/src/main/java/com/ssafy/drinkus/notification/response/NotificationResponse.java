package com.ssafy.drinkus.notification.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.drinkus.notification.domain.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {

    private Long notificationId;

    private Long userId;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;

    public static NotificationResponse from(Notification notification) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.notificationId = notification.getNotificationId();
        notificationResponse.userId = notification.getUserId();
        notificationResponse.content = notification.getContent();
        notificationResponse.createdDate = notification.getCreatedDate();
        return notificationResponse;
    }
}
