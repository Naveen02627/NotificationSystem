package com.NotificationConsumer.NotificationConsumer.Service;

import com.NotificationConsumer.NotificationConsumer.DTO.NotificationEvent;

public interface NotificationSender {

    public void send(NotificationEvent event);
}
