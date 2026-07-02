package com.NotificationConsumer.NotificationConsumer.Service;


import com.NotificationConsumer.NotificationConsumer.Entity.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationFactory {

    private final EmailNotificationService emailService;

    public NotificationSender getSender(Type type) {

        switch (type) {

            case EMAIL:
                return emailService;



            default:
                throw new IllegalArgumentException("Unsupported Notification Type");

        }

    }
}