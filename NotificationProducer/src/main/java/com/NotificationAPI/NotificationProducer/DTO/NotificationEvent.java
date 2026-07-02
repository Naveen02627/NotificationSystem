package com.NotificationAPI.NotificationProducer.DTO;

import com.NotificationAPI.NotificationProducer.Entity.Type;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder

public class NotificationEvent {

    private Long notificationId;

    private String email;

    private String subject;

    private String message;

    private Type type;
}
