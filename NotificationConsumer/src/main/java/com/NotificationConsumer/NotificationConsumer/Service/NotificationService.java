package com.NotificationConsumer.NotificationConsumer.Service;

import com.NotificationConsumer.NotificationConsumer.DTO.NotificationEvent;
import com.NotificationConsumer.NotificationConsumer.Entity.Notification;
import com.NotificationConsumer.NotificationConsumer.Entity.Status;
import com.NotificationConsumer.NotificationConsumer.Entity.Type;
import com.NotificationConsumer.NotificationConsumer.Repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;
    private final NotificationFactory notificationFactory;

    public void processNotification(NotificationEvent event) {
        System.out.println("Processing Notification");
        System.out.println(event);

        Notification notification = repository.findById(event.getNotificationId())
                .orElseThrow(() -> new RuntimeException("Notification not found: " + event.getNotificationId()));

        notification.setStatus(Status.PROCESSING);
        repository.save(notification);

        try {

            Type typeEnum = Type.valueOf(event.getType().toUpperCase());
            NotificationSender sender = notificationFactory.getSender(typeEnum);
            sender.send(event);
            notification.setStatus(Status.SENT);
            notification.setSentAt(LocalDateTime.now());
        } catch (IllegalArgumentException e) {

            notification.setStatus(Status.FAILED);
            notification.setFailureReason("Invalid notification type: " + event.getType());
        } catch (Exception e) {
            notification.setStatus(Status.FAILED);
            notification.setFailureReason(e.getMessage());

            int retry = notification.getRetryCount() != null ? notification.getRetryCount() : 0;
            notification.setRetryCount(retry + 1);
        }

        notification.setLastUpdate(LocalDateTime.now());
        repository.save(notification);
    }
}