# 📦 Notification System

A production‑ready, event‑driven notification platform built with **Spring Boot**, **Apache Kafka**, **PostgreSQL**, and **Docker**.  
It supports **Email notifications** right now and is architected to easily add **SMS**, **WhatsApp**, **Push**, and more – using the **Factory Pattern**.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)  
2. [Features](#-features)  
3. [Architecture Diagram](#-architecture-diagram)  
4. [Technologies Used](#-technologies-used)  
5. [Project Structure](#-project-structure)  
6. [Workflow & Notification Lifecycle](#-workflow--notification-lifecycle)  
7. [Database Schema](#-database-schema)  
8. [Kafka Topics](#-kafka-topics)  
9. [Docker Setup](#-docker-setup)  
10. [Running the Project](#-running-the-project)  
11. [API Documentation](#-api-documentation)  
12. [Retry & Dead Letter Queue (DLQ)](#-retry--dead-letter-queue-dlq)  
13. [Factory Pattern – Scalable Senders](#-factory-pattern--scalable-senders)  
14. [Future Improvements](#-future-improvements)  
15. [Screenshots](#-screenshots)  
16. [Author](#-author)

---

## 📖 Project Overview

The **Notification System** is a fully asynchronous, scalable platform that accepts notification requests via REST API, persists them in **PostgreSQL**, publishes events to **Apache Kafka**, and then consumes those events to actually send the notifications (currently Email).  

By separating the **Producer** and **Consumer**, the system achieves:

- **High throughput** – the API returns immediately, processing happens in the background.
- **Fault tolerance** – messages are stored in Kafka and can be replayed.
- **Extensibility** – new notification channels (SMS, WhatsApp, Push) can be added without touching the core logic.

---

## ✨ Features

- **REST API** for creating notifications
- **Asynchronous processing** with Apache Kafka
- **Persistent storage** in PostgreSQL (status tracking)
- **Email sending** using Gmail SMTP
- **Factory Pattern** for pluggable notification senders (Email, SMS, WhatsApp)
- **Retry mechanism** with dedicated retry topic and Dead Letter Queue (DLQ)
- **Docker Compose** for instant local environment (Kafka, Zookeeper, PostgreSQL)
- **Status lifecycle** – PENDING → PROCESSING → SENT / FAILED → RETRY → DLQ
- **Modular project** – separate Producer & Consumer modules

---

## 🏗 Architecture Diagram

> *(Replace the placeholder below with your actual diagram image)*

![Architecture Diagram](assets/architecture.png)

The **Producer** receives a REST request, saves the notification in PostgreSQL, and publishes an event to Kafka.  
The **Consumer** picks up the event, updates the status, uses a **Factory** to select the appropriate sender (Email, SMS, etc.), and delivers the notification. Failed attempts are retried automatically and eventually moved to a Dead Letter Queue if they keep failing.

---

## 🧰 Technologies Used

| Category           | Technology                      |
|--------------------|---------------------------------|
| Backend Language   | Java 17                         |
| Framework          | Spring Boot 3.x                 |
| Messaging          | Apache Kafka                    |
| Database           | PostgreSQL                      |
| Containerization   | Docker, Docker Compose          |
| Email              | JavaMailSender (SMTP)           |
| Build Tool         | Maven                           |
| Design Patterns    | Factory Pattern, Event-Driven   |

---

## 📁 Project Structure

NotificationSystem/
├── NotificationProducer/ # REST API module
│ ├── src/main/java/com/.../producer/
│ │ ├── controller/ # API endpoints
│ │ ├── entity/ # JPA entities
│ │ ├── repository/ # Spring Data repositories
│ │ ├── service/ # Business logic
│ │ └── kafka/ # Kafka producer config
│ ├── src/main/resources/
│ │ └── application.properties
│ └── pom.xml
├── NotificationConsumer/ # Kafka consumer module
│ ├── src/main/java/com/.../consumer/
│ │ ├── consumer/ # Kafka listener
│ │ ├── notification/ # Factory & Senders
│ │ ├── entity/
│ │ ├── repository/
│ │ └── config/
│ ├── src/main/resources/
│ │ └── application.properties
│ └── pom.xml
├── docker-compose.yml # Local infrastructure
└── README.md
