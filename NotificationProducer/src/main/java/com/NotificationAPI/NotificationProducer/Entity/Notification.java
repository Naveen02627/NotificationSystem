package com.NotificationAPI.NotificationProducer.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Type type;

    public String message;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String email;

    private String subject;

    private String failureReason;

    private Integer retryCount;

    private LocalDateTime createdAt;

    private LocalDateTime sentAt;

    private LocalDateTime lastUpdate;



}
