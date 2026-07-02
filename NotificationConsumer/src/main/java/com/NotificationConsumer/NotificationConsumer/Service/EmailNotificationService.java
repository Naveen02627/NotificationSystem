package com.NotificationConsumer.NotificationConsumer.Service;

import com.NotificationConsumer.NotificationConsumer.DTO.NotificationEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService implements NotificationSender {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void send(NotificationEvent event) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(event.getEmail());
        message.setSubject(event.getSubject());
        message.setText(event.getMessage());



        mailSender.send(message);


        System.out.println("✅ Email sent to: " + event.getEmail());
    }
}
