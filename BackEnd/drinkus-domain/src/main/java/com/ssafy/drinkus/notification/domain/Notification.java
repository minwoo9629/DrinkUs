package com.ssafy.drinkus.notification.domain;

import com.ssafy.drinkus.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    private Long userId;

    private String content;

    public static Notification createNotification(Long userId, String content){
        Notification notification = new Notification();
        notification.userId = userId;
        notification.content = content;
        return notification;
    }
}
