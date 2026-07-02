package com.NotificationAPI.NotificationProducer.DTO;

import com.NotificationAPI.NotificationProducer.Entity.Status;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NotificationResponse {
    private Long id;
    private String message;
    private String email;
    private Status status;
    private String response;
}
