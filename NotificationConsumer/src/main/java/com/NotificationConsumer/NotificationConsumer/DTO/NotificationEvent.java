package com.NotificationConsumer.NotificationConsumer.DTO;

import com.NotificationConsumer.NotificationConsumer.Entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEvent {
    private Long notificationId;
    private String email;
    private String subject;
    private String message;
    private String type;
}