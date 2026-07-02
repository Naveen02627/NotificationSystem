package com.NotificationAPI.NotificationProducer.Config;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailDomainValidator.class)
public @interface ValidEmail {
    String message() default "Invalid email domain (no MX or A record found)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}