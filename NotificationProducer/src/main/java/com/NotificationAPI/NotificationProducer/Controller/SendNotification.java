package com.NotificationAPI.NotificationProducer.Controller;


import com.NotificationAPI.NotificationProducer.DTO.NotificationRequest;

import com.NotificationAPI.NotificationProducer.Service.NotificationProducer;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/notification")
@CrossOrigin("*")
public class SendNotification {

    private final NotificationProducer notificationProducer;

    public SendNotification(NotificationProducer notificationProducer) {
        this.notificationProducer = notificationProducer;
    }

    @PostMapping
    public ResponseEntity<?> sendNotification(@Valid @RequestBody NotificationRequest event) {
        try {

            return notificationProducer.createNotification(event);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping()
    public String SayHello() {

        return "Hello I am Online";
    }

}

