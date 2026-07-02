package com.NotificationAPI.NotificationProducer.Service;


import com.NotificationAPI.NotificationProducer.DTO.NotificationEvent;
import com.NotificationAPI.NotificationProducer.Entity.Notification;
import com.NotificationAPI.NotificationProducer.Entity.Status;
import com.NotificationAPI.NotificationProducer.Repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RetryService {

    private final NotificationRepository notificationRepository;
    private final NotificationProducer notificationProducer;
    private static final int MAX_RETRIES = 3;


    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void retryFailedNotifications() {
        List<Notification> failedNotifications = notificationRepository
                .findByStatusAndRetryCountLessThan(Status.RETRYING, MAX_RETRIES);

        if (failedNotifications.isEmpty()) {
            log.info("No failed notifications to retry.");
            return;
        }

        log.info("Retrying {} failed notifications", failedNotifications.size());

        for (Notification notification : failedNotifications) {

            NotificationEvent event = NotificationEvent.builder()
                    .notificationId(notification.getId())
                    .email(notification.getEmail())
                    .subject(notification.getSubject())
                    .message(notification.getMessage())
                    .type(notification.getType())
                    .build();


            boolean success = notificationProducer.sendNotification(event);

            notification.setLastUpdate(LocalDateTime.now());
            if (success) {
                notification.setStatus(Status.SENT);
                notification.setFailureReason(null);
                log.info("Retry succeeded for notification ID: {}", notification.getId());
            } else {
                notification.setRetryCount(notification.getRetryCount() + 1);
                notification.setFailureReason("Retry " + notification.getRetryCount() + " failed");
                if (notification.getRetryCount() >= MAX_RETRIES) {
                    notification.setStatus(Status.FAILED);
                    log.error("Notification ID {} exceeded max retries.", notification.getId());
                }
                log.warn("Retry failed for notification ID: {}, retry count: {}",
                        notification.getId(), notification.getRetryCount());
            }
            notificationRepository.save(notification);
        }
    }
}
