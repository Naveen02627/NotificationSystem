package com.NotificationAPI.NotificationProducer.Repository;

import com.NotificationAPI.NotificationProducer.Entity.Notification;
import com.NotificationAPI.NotificationProducer.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStatusAndRetryCountLessThan(Status status, int maxRetries);
}
