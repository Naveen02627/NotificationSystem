package com.NotificationConsumer.NotificationConsumer.Repository;

import com.NotificationConsumer.NotificationConsumer.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
