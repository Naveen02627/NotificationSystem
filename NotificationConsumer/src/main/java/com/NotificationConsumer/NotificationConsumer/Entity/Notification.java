package com.NotificationConsumer.NotificationConsumer.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;


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