package com.NotificationAPI.NotificationProducer.DTO;

import com.NotificationAPI.NotificationProducer.Config.ValidEmail;
import com.NotificationAPI.NotificationProducer.Entity.Type;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {

    @NotNull(message = "Message is required")
    private String message;

    @NotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    @ValidEmail
    private String email;

    @NotNull(message = "Subject is required")
    private String subject;

    @NotNull(message = "Type is required")
    private Type type;
}