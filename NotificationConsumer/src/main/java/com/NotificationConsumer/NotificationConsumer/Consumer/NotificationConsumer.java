package com.NotificationConsumer.NotificationConsumer.Consumer;

import com.NotificationConsumer.NotificationConsumer.DTO.NotificationEvent;
import com.NotificationConsumer.NotificationConsumer.Service.NotificationService;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "notifications", groupId = "notification-group")
    public void consume(String json) {
        System.out.println("Kafka Message Received");
        System.out.println(json);

        try {
            NotificationEvent event = objectMapper.readValue(json, NotificationEvent.class);
            notificationService.processNotification(event);
        } catch (Exception e) {
            System.out.println("Failed to deserialize message");
            e.printStackTrace();
        }
    }
}