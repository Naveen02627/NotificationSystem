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


![Architecture Diagram](https://github.com/Naveen02627/NotificationSystem/blob/main/ScreenShots/tp.png)

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

# 📁 Project Structure

```text
NotificationSystem/
│
├── NotificationProducer/              # REST API module
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/.../producer/
│   │       │       ├── controller/    # REST API endpoints
│   │       │       ├── entity/        # JPA entities
│   │       │       ├── repository/    # Spring Data JPA repositories
│   │       │       ├── service/       # Business logic
│   │       │       └── kafka/         # Kafka producer configuration
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── NotificationConsumer/              # Kafka consumer module
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/.../consumer/
│   │       │       ├── consumer/      # Kafka listeners
│   │       │       ├── notification/  # Notification Factory & Senders
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── config/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── docker-compose.yml                 # Kafka, Zookeeper, Database
├── README.md
└── .gitignore
```

---

## ⚙ Workflow & Notification Lifecycle

### 1. Request arrives
Client sends a `POST /api/notifications` request with `email`, `subject`, `message`, and `type`.

### 2. Producer saves to DB
Notification is stored in PostgreSQL with `status = PENDING`.

### 3. Producer publishes to Kafka
An event `NotificationEvent` is published to the Kafka topic `notifications`.

### 4. Producer returns OK
API returns `200` with the notification ID and status `PENDING` – no waiting for actual delivery.

### 5. Consumer picks up the message
The consumer (running in a separate process/container) reads from `notifications` topic.

### 6. Status update
Updates notification status to `PROCESSING`.

### 7. Factory selects sender
Based on `type` (e.g., `EMAIL`), the **NotificationSenderFactory** returns the appropriate sender implementation (e.g., `EmailNotificationSender`).

### 8. Sender delivers
Email is sent via SMTP.

### 9. Final status
- **Success** → status = `SENT`, `sentAt` set.
- **Failure** → status = `FAILED`, `failureReason` recorded.

### 🔁 Retry Flow
- Failed messages are re‑published to a **retry topic**.
- Retry consumer increments `retryCount` and tries again.
- After 3 failed attempts → moved to **Dead Letter Queue (DLQ)** for manual inspection.

---

## 🗄 Database Schema

Table: `notifications`

| Column           | Description                                   |
|------------------|-----------------------------------------------|
| `id`             | Primary key (auto-generated)                  |
| `email`          | Recipient email                               |
| `subject`        | Email subject                                 |
| `message`        | Notification body                             |
| `type`           | EMAIL / SMS / WHATSAPP                        |
| `status`         | PENDING, PROCESSING, SENT, FAILED, RETRY, DLQ |
| `retry_count`    | Number of retries attempted                   |
| `failure_reason` | Last failure message                          |
| `created_at`     | Timestamp of creation                         |
| `updated_at`     | Last status change                            |
| `sent_at`        | Time of successful delivery                   |

---

## 📨 Kafka Topics

| Topic Name           | Purpose                               |
|----------------------|---------------------------------------|
| `notifications`      | Main topic – new notification events  |
| `notifications-retry`| Retry failed deliveries               |
| `notifications-dlq`  | Dead Letter Queue after max retries   |

**Configuration details** (defined in Producer’s Kafka config):
- **Partitions:** 1 (scalable later)
- **Replication Factor:** 1 (for local dev)
- **Consumer Group:** `notification-group`

---

## 🐳 Docker Setup

The `docker-compose.yml` file includes:

- **ZooKeeper** – required by Kafka for cluster coordination.
- **Kafka** – message broker on port `9092`.
- **PostgreSQL** – database on port `5432` with pre-created user, password, and database.

### Why these services?

- **ZooKeeper**: Kafka relies on it for leader election and metadata management.
- **Kafka**: Enables decoupled, durable, and scalable event streaming.
- **PostgreSQL**: Reliable SQL database for persistence and status tracking.
- **Volumes**: Data is stored on your host to survive container restarts.

### Start the infrastructure only

```bash
docker-compose up -d

# 🚀 Running the Project

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

* Java 17+
* Maven 3.9+
* Docker
* Docker Compose
* PostgreSQL (if not using Docker)

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Naveen02627/NotificationSystem.git
cd NotificationSystem
```

---

## 2️⃣ Start Kafka, Zookeeper, and PostgreSQL

```bash
docker-compose up -d
```

Verify that all containers are running:

```bash
docker ps
```

---

## 3️⃣ Configure Gmail SMTP

The **Notification Consumer** requires Gmail credentials to send email notifications.

Set the following environment variables:

### Linux / macOS

```bash
export GMAIL_USERNAME=your_email@gmail.com
export GMAIL_APP_PASSWORD=your_16_character_app_password
```

### Windows PowerShell

```powershell
$env:GMAIL_USERNAME="your_email@gmail.com"
$env:GMAIL_APP_PASSWORD="your_16_character_app_password"
```

> **Note:** Use a Gmail **App Password**, not your normal Gmail password.
> Generate one from:
>
> **Google Account → Security → 2-Step Verification → App Passwords**

---

## 4️⃣ Build Both Services

### Build Producer

```bash
cd NotificationProducer
./mvnw clean package -DskipTests
```

### Build Consumer

```bash
cd ../NotificationConsumer
./mvnw clean package -DskipTests
```

Return to the root directory:

```bash
cd ..
```

---

## 5️⃣ Run the Producer

```bash
cd NotificationProducer
java -jar target/notification-producer-*.jar
```

Producer runs on:

```
http://localhost:8082
```

---

## 6️⃣ Run the Consumer

```bash
cd ../NotificationConsumer
java -jar target/notification-consumer-*.jar
```

Consumer runs on:

```
http://localhost:8081
```

---

# 🐳 Running with Docker

Each Spring Boot module contains its own Dockerfile.

## Build Docker Images

### Producer

```bash
cd NotificationProducer
docker build -t notification-producer .
```

### Consumer

```bash
cd ../NotificationConsumer
docker build -t notification-consumer .
cd ..
```

---

## Run Producer Container

```bash
docker run -d \
  --name producer \
  --network host \
  -e SPRING_KAFKA_BOOTSTRAP_SERVERS=localhost:9092 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/notificationdb \
  notification-producer
```

---

## Run Consumer Container

```bash
docker run -d \
  --name consumer \
  --network host \
  -e SPRING_KAFKA_BOOTSTRAP_SERVERS=localhost:9092 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/notificationdb \
  -e GMAIL_USERNAME=your_email@gmail.com \
  -e GMAIL_APP_PASSWORD=your_app_password \
  notification-consumer
```

> **Note**
>
> `--network host` is used for local development.
> In production, create a dedicated Docker network and use service names instead of `localhost`.

---

# 📡 REST API

## Create Notification

**POST**

```
http://localhost:8080/api/notifications
```

### Request Body

```json
{
  "email": "user@example.com",
  "subject": "Welcome!",
  "message": "Hello from Kafka!",
  "type": "EMAIL"
}
```

### Response

```json
{
    "email": "user@Example.com",
    "id": 16,
    "message": "Hello from Kafka!",
    "response": null,
    "status": "SENT"
}
```

---

# 🔄 Retry Mechanism & Dead Letter Queue (DLQ)

The notification system implements a retry strategy to ensure reliable message delivery.

### Workflow

1. Producer publishes the notification to Kafka.
2. Consumer attempts to send the email.
3. If delivery fails, the event is sent to the **Retry Topic**.
4. Retry Consumer retries the notification.
5. After **3 unsuccessful attempts**, the notification is moved to the **Dead Letter Queue (DLQ)**.
6. Failed events remain available for manual investigation.

### Kafka Topics

* `notifications`
* `notifications-retry`
* `notifications-dlq`

### Benefits

* Prevents infinite retry loops
* No message loss
* Easier production debugging
* Fault-tolerant architecture

---

# 🏭 Factory Pattern

The Consumer uses the Factory Pattern to support multiple notification channels.

```java
public interface NotificationSender {
    void send(NotificationEvent event);
}

public class EmailNotificationSender implements NotificationSender { } Done

//public class SmsNotificationSender implements NotificationSender { } I haven't implemented But It can beimplemented By Doing Minimal Changes 

//public class WhatsAppNotificationSender implements NotificationSender { }

public class NotificationSenderFactory {

    public static NotificationSender getSender(NotificationType type) {

        return switch (type) {

            case EMAIL -> new EmailNotificationSender();
            case SMS -> new SmsNotificationSender();
            case WHATSAPP -> new WhatsAppNotificationSender();

        };
    }
}
```

### Advantages

* Open/Closed Principle
* Easy to extend
* Cleaner business logic
* Supports future notification channels

---

# 🚀 Future Enhancements

* ✅ Email Notification
* ⬜ SMS Notification (Twilio)
* ⬜ WhatsApp Cloud API
* ⬜ Push Notifications (Firebase)
* ⬜ Outbox Pattern
* ⬜ Redis for Idempotency
* ⬜ Prometheus Monitoring
* ⬜ Grafana Dashboard
* ⬜ Kubernetes Deployment
* ⬜ Swagger / OpenAPI
* ⬜ Authentication & Authorization
* ⬜ Rate Limiting

---



---

# 👨‍💻 Author

## Naveen Jangid

**Backend Developer**

Java • Spring Boot • Apache Kafka • Docker • PostgreSQL • JPA/Hibernate

* GitHub: https://github.com/Naveen02627
* LinkedIn: https://www.linkedin.com/in/naveen-jangid-028174296/
