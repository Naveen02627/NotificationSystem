package com.NotificationAPI.NotificationProducer.Service;

import com.NotificationAPI.NotificationProducer.DTO.NotificationEvent;
import com.NotificationAPI.NotificationProducer.DTO.NotificationRequest;
import com.NotificationAPI.NotificationProducer.DTO.NotificationResponse;
import com.NotificationAPI.NotificationProducer.Entity.Notification;
import com.NotificationAPI.NotificationProducer.Entity.Status;
import com.NotificationAPI.NotificationProducer.Repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationProducer {

    private final NotificationRepository notificationRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "notifications";

    public ResponseEntity<?> createNotification(NotificationRequest notificationRequest) {

        Notification notification = Notification.builder()
                .email(notificationRequest.getEmail())
                .message(notificationRequest.getMessage())
                .subject(notificationRequest.getSubject())
                .type(notificationRequest.getType())
                .createdAt(LocalDateTime.now())
                .lastUpdate(LocalDateTime.now())
                .retryCount(0)
                .failureReason(null)
                .status(Status.PENDING)
                .build();

        notification = notificationRepository.save(notification);


        NotificationEvent event = NotificationEvent.builder()
                .notificationId(notification.getId())
                .email(notification.getEmail())
                .subject(notification.getSubject())
                .message(notification.getMessage())
                .type(notification.getType())
                .build();


        boolean sentSuccessfully = sendNotification(event);

        if (sentSuccessfully) {
            notification.setStatus(Status.SENT);
        } else {
            notification.setStatus(Status.RETRYING);
            notification.setFailureReason("Kafka send failed after timeout");
        }
        notification.setLastUpdate(LocalDateTime.now());
        notificationRepository.save(notification);


        NotificationResponse response = NotificationResponse.builder()
                .id(notification.getId())
                .email(notification.getEmail())
                .message(notification.getMessage())
                .status(notification.getStatus())
                .build();

        if (!sentSuccessfully) {
            response.setResponse("Request failed – we will retry after a few minutes. Thank you.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    public boolean sendNotification(NotificationEvent event) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC, json).get(5, TimeUnit.SECONDS);
            return true;
        } catch (Exception e) {
            log.error("Failed to send Kafka event", e);
            return false;
        }
    }
}