# OfferZone Backend - Microservice Architecture

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Running Services
```bash
# Consumer Service (Port 8081)
cd consumer-service && mvn spring-boot:run

# Retailer Service (Port 8082)  
cd retailer-service && mvn spring-boot:run

# Category Service (Port 8083)
cd category-service && mvn spring-boot:run

# Offer Service (Port 8084)
cd offer-service && mvn spring-boot:run

# Interaction Service (Port 8085)
cd interaction-service && mvn spring-boot:run
```

### Build All Services
```bash
./start-services.sh
```

## 📋 Service Overview

| Service | Port | Purpose | Database | Status |
|---------|------|---------|----------|---------|
| Consumer | 8081 | End-user management | consumerdb | ✅ Ready |
| Retailer | 8082 | Business management | retailerdb | ✅ Ready |
| Category | 8083 | Category management | categorydb | ✅ Ready |
| Offer | 8084 | Offer management | offerdb | ✅ Ready |
| Interaction | 8085 | Analytics tracking | interactiondb | ✅ Ready |

## 🗄️ Database Access

| Service | H2 Console | JDBC URL |
|---------|------------|----------|
| Consumer | http://localhost:8081/h2-console | `jdbc:h2:mem:consumerdb` |
| Retailer | http://localhost:8082/h2-console | `jdbc:h2:mem:retailerdb` |
| Category | http://localhost:8083/h2-console | `jdbc:h2:mem:categorydb` |
| Offer | http://localhost:8084/h2-console | `jdbc:h2:mem:offerdb` |
| Interaction | http://localhost:8085/h2-console | `jdbc:h2:mem:interactiondb` |

**Login**: Username: `sa`, Password: (empty)

## 📖 Detailed Documentation

For comprehensive documentation, procedures, and examples, see:
**[📋 SERVICE_GUIDE.md](./SERVICE_GUIDE.md)**

## 🏗️ Architecture

### Core Services
| Service | Port | Purpose | Database |
|---------|------|---------|----------|
| Consumer Service | 8081 | Manages end-users who browse/redeem offers | H2 (consumerdb) |
| Retailer Service | 8082 | Manages businesses who create offers | H2 (retailerdb) |
| Category Service | 8083 | Manages offer categories (Electronics, Food, etc.) | H2 (categorydb) |
| Offer Service | 8084 | Main service for offer management | H2 (offerdb) |
| Interaction Service | 8085 | Tracks user actions and analytics | H2 (interactiondb) |

## Data Models

### 1. Consumer Model
```java
- id (Long) - Primary Key
- name (String) - Consumer full name
- email (String) - Unique email address
- phone (String) - Contact number
- address (String) - Delivery address
- status (ConsumerStatus) - ACTIVE, INACTIVE, SUSPENDED, DELETED
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)
```

### 2. Retailer Model
```java
- id (Long) - Primary Key
- businessName (String) - Business name
- email (String) - Unique business email
- phone (String) - Business contact
- address (String) - Business address
- description (String) - Business description
- status (RetailerStatus) - PENDING, ACTIVE, INACTIVE, SUSPENDED, DELETED
- subscriptionPlan (SubscriptionPlan) - FREE, BASIC, PREMIUM, ENTERPRISE
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)
```

### 3. Category Model
```java
- id (Long) - Primary Key
- name (String) - Category name (unique)
- description (String) - Category description
- iconUrl (String) - Category icon URL
- colorCode (String) - Hex color code for UI
- status (CategoryStatus) - ACTIVE, INACTIVE, DELETED
- sortOrder (Integer) - Display order
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)
```

### 4. Offer Model
```java
- id (Long) - Primary Key
- title (String) - Offer title
- description (String) - Detailed description
- originalPrice (BigDecimal) - Original price
- discountedPrice (BigDecimal) - Discounted price
- discountPercentage (BigDecimal) - Auto-calculated discount %
- imageUrl (String) - Offer image URL
- retailerId (Long) - Reference to retailer
- categoryId (Long) - Reference to category
- status (OfferStatus) - DRAFT, ACTIVE, PAUSED, EXPIRED, EXHAUSTED, CANCELLED, DELETED
- validFrom (LocalDateTime) - Offer start date
- validUntil (LocalDateTime) - Offer end date
- termsConditions (String) - T&C
- maxRedemptions (Integer) - Maximum redemptions allowed
- currentRedemptions (Integer) - Current redemption count
- createdAt (LocalDateTime)
- updatedAt (LocalDateTime)
```

### 5. Interaction Model
```java
- id (Long) - Primary Key
- consumerId (Long) - Reference to consumer
- offerId (Long) - Reference to offer
- interactionType (InteractionType) - VIEW, SAVE, UNSAVE, SHARE, REDEEM, CLICK, SEARCH, FILTER
- interactionData (String) - Additional JSON data
- deviceInfo (String) - Device/browser info
- ipAddress (String) - User IP address
- sessionId (String) - Session identifier
- createdAt (LocalDateTime)
```

## Service Independence

### Current Design Benefits:
1. **Loose Coupling**: Each service manages its own data and business logic
2. **Independent Deployment**: Services can be deployed separately
3. **Technology Flexibility**: Each service can use different tech stacks if needed
4. **Scalability**: Services can be scaled independently based on load
5. **Fault Isolation**: Failure in one service doesn't affect others

### Inter-Service Communication:
- **Current**: Services are independent with foreign key references (retailerId, categoryId, etc.)
- **Future**: Will implement REST APIs, message queues, or event-driven communication

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

### Running Services

#### Option 1: Run Individual Services
```bash
# Consumer Service
cd Backend/consumer-service
mvn spring-boot:run

# Retailer Service  
cd Backend/retailer-service
mvn spring-boot:run

# Category Service
cd Backend/category-service
mvn spring-boot:run

# Offer Service
cd Backend/offer-service
mvn spring-boot:run

# Interaction Service
cd Backend/interaction-service
mvn spring-boot:run
```

#### Option 2: Build All Services
```bash
# Build all services
find Backend -name "pom.xml" -execdir mvn clean install \;
```

### Database Access
Each service uses H2 in-memory database:
- **Console URLs**: 
  - Consumer: http://localhost:8081/h2-console
  - Retailer: http://localhost:8082/h2-console
  - Category: http://localhost:8083/h2-console
  - Offer: http://localhost:8084/h2-console
  - Interaction: http://localhost:8085/h2-console

## Development Roadmap

### Phase 1: Foundation (Current)
- ✅ Basic model design
- ✅ Service structure setup
- ✅ Database configuration

### Phase 2: Core Implementation (Next)
- [ ] Repository layers
- [ ] Service layers  
- [ ] REST controllers
- [ ] Basic CRUD operations

### Phase 3: Integration
- [ ] Service-to-service communication
- [ ] API Gateway
- [ ] Service discovery
- [ ] Configuration management

### Phase 4: Production Ready
- [ ] Database migration (H2 → PostgreSQL/MySQL)
- [ ] Containerization (Docker)
- [ ] Orchestration (Kubernetes)
- [ ] Monitoring & Logging
- [ ] Security implementation

## Technology Stack

### Current
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: H2 (Development)
- **Build Tool**: Maven
- **Validation**: Jakarta Validation
- **ORM**: Spring Data JPA

### Future Considerations
- **Database**: PostgreSQL/MySQL
- **Service Discovery**: Eureka/Consul
- **API Gateway**: Spring Cloud Gateway/Zuul
- **Message Queue**: RabbitMQ/Apache Kafka
- **Caching**: Redis
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## Frontend Integration

The backend is designed to be frontend-agnostic:
- RESTful APIs will be exposed
- JSON responses for easy consumption
- CORS configuration for web applications
- Stateless design for scalability

---

*This architecture provides a solid foundation for a scalable, maintainable offer management platform that can grow with business needs.*

---------



----------

## Each service description:

# 🏗️ OfferZone Backend Services - Complete Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Service Architecture](#service-architecture)
- [Service Details](#service-details)
  - [1. Consumer Service](#1-consumer-service)
  - [2. Retailer Service](#2-retailer-service)
  - [3. Category Service](#3-category-service)
  - [4. Offer Service](#4-offer-service)
  - [5. Interaction Service](#5-interaction-service)
- [Running the Services](#running-the-services)
- [Database Access](#database-access)
- [API Endpoints (Future)](#api-endpoints-future)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

OfferZone is a microservice-based offer management platform with 5 independent services:
- **Consumer Service**: Manages end-users
- **Retailer Service**: Manages businesses
- **Category Service**: Manages offer categories
- **Offer Service**: Manages deals/offers
- **Interaction Service**: Tracks user analytics

## ⚙️ Prerequisites

- **Java 17+** (OpenJDK or Oracle JDK)
- **Maven 3.6+** (Build tool)
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)
- **Web Browser** (For H2 Console access)

## 🏛️ Service Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Consumer Service│    │ Retailer Service│    │ Category Service│
│    Port: 8081   │    │    Port: 8082   │    │    Port: 8083   │
│   DB: consumerdb│    │   DB: retailerdb│    │   DB: categorydb│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────┐    ┌─┴───────────────┐
         │  Offer Service  │    │ Interaction     │
         │   Port: 8084    │    │ Service         │
         │   DB: offerdb   │    │ Port: 8085      │
         └─────────────────┘    │ DB: interactiondb│
                                └─────────────────┘
```

---

## 📝 Service Details

## 1. 👥 Consumer Service

### **Purpose**
Manages end-users who browse and redeem offers.

### **Port & Database**
- **Port**: 8081
- **Database**: H2 in-memory (`consumerdb`)
- **Console**: http://localhost:8081/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate to Service Directory**
```bash
cd Backend/consumer-service
```

#### **Step 2: Build the Service**
```bash
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: 3.2 s
[INFO] Finished at: 2025-11-03T01:30:45+05:30
```

#### **Step 3: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

2025-11-03T01:30:50.486+05:30  INFO 12345 --- [main] c.o.consumer.ConsumerServiceApplication : Starting ConsumerServiceApplication
2025-11-03T01:30:50.887+05:30  INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8081 (http)
2025-11-03T01:30:51.021+05:30  INFO 12345 --- [main] o.s.b.a.h2.H2ConsoleAutoConfiguration   : H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:consumerdb'

Hibernate: drop table if exists consumers cascade 
Hibernate: create table consumers (
    created_at timestamp(6) not null, 
    id bigint generated by default as identity, 
    updated_at timestamp(6), 
    phone varchar(15), 
    name varchar(100) not null, 
    email varchar(150) not null unique, 
    address varchar(200), 
    status varchar(255) not null check (status in ('ACTIVE','INACTIVE','SUSPENDED','DELETED')), 
    primary key (id)
)

2025-11-03T01:30:51.767+05:30  INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8081 (http)
2025-11-03T01:30:51.770+05:30  INFO 12345 --- [main] c.o.consumer.ConsumerServiceApplication : Started ConsumerServiceApplication in 1.447 seconds
```

#### **Step 4: Verify Service is Running**
```bash
curl http://localhost:8081/actuator/health
# OR visit in browser: http://localhost:8081
```

### **🗄️ Database Schema**
The service creates the following table structure:

```sql
CREATE TABLE consumers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(200),
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','SUSPENDED','DELETED')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **🔍 Database Access**
1. **Open H2 Console**: http://localhost:8081/h2-console
2. **Connection Details**:
   - **JDBC URL**: `jdbc:h2:mem:consumerdb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. **Click Connect**

### **📊 Sample Data Queries**
```sql
-- View all consumers
SELECT * FROM consumers;

-- Insert a sample consumer
INSERT INTO consumers (name, email, phone, address, status, created_at, updated_at) 
VALUES ('John Doe', 'john@example.com', '1234567890', '123 Main St', 'ACTIVE', NOW(), NOW());

-- Count consumers by status
SELECT status, COUNT(*) FROM consumers GROUP BY status;
```

---

## 2. 🏪 Retailer Service

### **Purpose**
Manages businesses who create and manage offers.

### **Port & Database**
- **Port**: 8082
- **Database**: H2 in-memory (`retailerdb`)
- **Console**: http://localhost:8082/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate and Build**
```bash
cd Backend/retailer-service
mvn clean install
```

#### **Step 2: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
2025-11-03T01:35:50.486+05:30  INFO 12346 --- [main] c.o.retailer.RetailerServiceApplication : Starting RetailerServiceApplication
2025-11-03T01:35:50.887+05:30  INFO 12346 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8082 (http)
2025-11-03T01:35:51.021+05:30  INFO 12346 --- [main] o.s.b.a.h2.H2ConsoleAutoConfiguration   : H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:retailerdb'

Hibernate: create table retailers (
    created_at timestamp(6) not null, 
    id bigint generated by default as identity, 
    updated_at timestamp(6), 
    phone varchar(15), 
    business_name varchar(150) not null, 
    email varchar(150) not null unique, 
    address varchar(300), 
    description varchar(500),
    status varchar(20) not null check (status in ('PENDING','ACTIVE','INACTIVE','SUSPENDED','DELETED')),
    subscription_plan varchar(20) not null check (subscription_plan in ('FREE','BASIC','PREMIUM','ENTERPRISE')),
    primary key (id)
)

2025-11-03T01:35:51.767+05:30  INFO 12346 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8082 (http)
```

### **🗄️ Database Schema**
```sql
CREATE TABLE retailers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(300),
    description VARCHAR(500),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING','ACTIVE','INACTIVE','SUSPENDED','DELETED')),
    subscription_plan VARCHAR(20) NOT NULL CHECK (subscription_plan IN ('FREE','BASIC','PREMIUM','ENTERPRISE')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **📊 Sample Operations**
```sql
-- Insert a sample retailer
INSERT INTO retailers (business_name, email, phone, address, description, status, subscription_plan, created_at, updated_at) 
VALUES ('Tech Store Inc.', 'admin@techstore.com', '9876543210', '456 Business Ave', 'Electronics retailer', 'PENDING', 'FREE', NOW(), NOW());

-- View retailers by subscription plan
SELECT subscription_plan, COUNT(*) FROM retailers GROUP BY subscription_plan;

-- Approve a retailer
UPDATE retailers SET status = 'ACTIVE' WHERE id = 1;
```

---

## 3. 📂 Category Service

### **Purpose**
Manages offer categories for organization and filtering.

### **Port & Database**
- **Port**: 8083
- **Database**: H2 in-memory (`categorydb`)
- **Console**: http://localhost:8083/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate and Build**
```bash
cd Backend/category-service
mvn clean install
```

#### **Step 2: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
2025-11-03T01:40:50.486+05:30  INFO 12347 --- [main] c.o.category.CategoryServiceApplication : Starting CategoryServiceApplication
2025-11-03T01:40:50.887+05:30  INFO 12347 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8083 (http)

Hibernate: create table categories (
    created_at timestamp(6) not null, 
    id bigint generated by default as identity, 
    updated_at timestamp(6), 
    sort_order integer,
    name varchar(100) not null unique, 
    description varchar(300), 
    icon_url varchar(200),
    color_code varchar(7),
    status varchar(20) not null check (status in ('ACTIVE','INACTIVE','DELETED')),
    primary key (id)
)

2025-11-03T01:40:51.767+05:30  INFO 12347 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8083 (http)
```

### **🗄️ Database Schema**
```sql
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(300),
    icon_url VARCHAR(200),
    color_code VARCHAR(7),
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','DELETED')),
    sort_order INTEGER,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **📊 Sample Data Setup**
```sql
-- Insert sample categories
INSERT INTO categories (name, description, icon_url, color_code, status, sort_order, created_at, updated_at) VALUES 
('Electronics', 'Phones, Laptops, Gadgets', '/icons/electronics.png', '#FF5733', 'ACTIVE', 1, NOW(), NOW()),
('Fashion', 'Clothing, Shoes, Accessories', '/icons/fashion.png', '#33FF57', 'ACTIVE', 2, NOW(), NOW()),
('Food & Dining', 'Restaurants, Fast Food, Groceries', '/icons/food.png', '#5733FF', 'ACTIVE', 3, NOW(), NOW()),
('Health & Beauty', 'Cosmetics, Healthcare, Wellness', '/icons/beauty.png', '#FF3357', 'ACTIVE', 4, NOW(), NOW()),
('Sports & Fitness', 'Gym, Sports Equipment, Outdoor', '/icons/sports.png', '#57FF33', 'ACTIVE', 5, NOW(), NOW());

-- View categories ordered by sort_order
SELECT * FROM categories WHERE status = 'ACTIVE' ORDER BY sort_order;
```

---

## 4. 🎯 Offer Service

### **Purpose**
Core service managing all offers/deals on the platform.

### **Port & Database**
- **Port**: 8084
- **Database**: H2 in-memory (`offerdb`)
- **Console**: http://localhost:8084/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate and Build**
```bash
cd Backend/offer-service
mvn clean install
```

#### **Step 2: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
2025-11-03T01:45:50.486+05:30  INFO 12348 --- [main] c.o.offer.OfferServiceApplication : Starting OfferServiceApplication
2025-11-03T01:45:50.887+05:30  INFO 12348 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8084 (http)

Hibernate: create table offers (
    created_at timestamp(6) not null, 
    id bigint generated by default as identity, 
    updated_at timestamp(6),
    valid_from timestamp(6),
    valid_until timestamp(6),
    retailer_id bigint not null,
    category_id bigint not null,
    current_redemptions integer,
    max_redemptions integer,
    original_price decimal(10,2) not null,
    discounted_price decimal(10,2) not null,
    discount_percentage decimal(5,2),
    title varchar(200) not null,
    description varchar(1000),
    image_url varchar(500),
    terms_conditions varchar(1000),
    status varchar(20) not null check (status in ('DRAFT','ACTIVE','PAUSED','EXPIRED','EXHAUSTED','CANCELLED','DELETED')),
    primary key (id)
)

2025-11-03T01:45:51.767+05:30  INFO 12348 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8084 (http)
```

### **🗄️ Database Schema**
```sql
CREATE TABLE offers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2),
    image_url VARCHAR(500),
    retailer_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    terms_conditions VARCHAR(1000),
    max_redemptions INTEGER,
    current_redemptions INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **📊 Sample Data and Operations**
```sql
-- Insert sample offers (assuming retailer_id=1 and category_id=1 exist)
INSERT INTO offers (title, description, original_price, discounted_price, discount_percentage, retailer_id, category_id, status, valid_from, valid_until, max_redemptions, current_redemptions, created_at, updated_at) VALUES 
('iPhone 15 Pro Max - 50% Off', 'Latest iPhone with amazing features', 1299.99, 649.99, 50.00, 1, 1, 'ACTIVE', NOW(), DATEADD('DAY', 30, NOW()), 100, 0, NOW(), NOW()),
('Samsung Galaxy S24 Deal', 'Premium Android smartphone', 999.99, 799.99, 20.00, 1, 1, 'ACTIVE', NOW(), DATEADD('DAY', 15, NOW()), 50, 0, NOW(), NOW());

-- View active offers with details
SELECT 
    o.title, 
    o.original_price, 
    o.discounted_price, 
    o.discount_percentage,
    o.status,
    o.current_redemptions,
    o.max_redemptions
FROM offers o 
WHERE o.status = 'ACTIVE' 
AND o.valid_from <= NOW() 
AND o.valid_until >= NOW();

-- Calculate savings
SELECT 
    title,
    original_price - discounted_price AS savings_amount,
    discount_percentage
FROM offers 
WHERE status = 'ACTIVE';
```

---

## 5. 📊 Interaction Service

### **Purpose**
Tracks all user interactions for analytics and personalization.

### **Port & Database**
- **Port**: 8085
- **Database**: H2 in-memory (`interactiondb`)
- **Console**: http://localhost:8085/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate and Build**
```bash
cd Backend/interaction-service
mvn clean install
```

#### **Step 2: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
2025-11-03T01:50:50.486+05:30  INFO 12349 --- [main] c.o.interaction.InteractionServiceApplication : Starting InteractionServiceApplication
2025-11-03T01:50:50.887+05:30  INFO 12349 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8085 (http)

Hibernate: create table interactions (
    created_at timestamp(6) not null, 
    id bigint generated by default as identity, 
    consumer_id bigint not null,
    offer_id bigint not null,
    session_id varchar(100),
    interaction_type varchar(20) not null check (interaction_type in ('VIEW','SAVE','UNSAVE','SHARE','REDEEM','CLICK','SEARCH','FILTER')),
    interaction_data varchar(500),
    device_info varchar(200),
    ip_address varchar(45),
    primary key (id)
)

2025-11-03T01:50:51.767+05:30  INFO 12349 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8085 (http)
```

### **🗄️ Database Schema**
```sql
CREATE TABLE interactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    consumer_id BIGINT NOT NULL,
    offer_id BIGINT NOT NULL,
    interaction_type VARCHAR(20) NOT NULL,
    interaction_data VARCHAR(500),
    device_info VARCHAR(200),
    ip_address VARCHAR(45),
    session_id VARCHAR(100),
    created_at TIMESTAMP NOT NULL
);
```

### **📊 Sample Analytics Queries**
```sql
-- Insert sample interactions
INSERT INTO interactions (consumer_id, offer_id, interaction_type, device_info, ip_address, session_id, created_at) VALUES 
(1, 1, 'VIEW', 'Chrome/120.0 Desktop', '192.168.1.100', 'session-001', NOW()),
(1, 1, 'SAVE', 'Chrome/120.0 Desktop', '192.168.1.100', 'session-001', NOW()),
(2, 1, 'VIEW', 'Safari/17.0 Mobile', '192.168.1.101', 'session-002', NOW()),
(2, 2, 'REDEEM', 'Safari/17.0 Mobile', '192.168.1.101', 'session-002', NOW());

-- Most popular offers (by views)
SELECT 
    offer_id, 
    COUNT(*) as view_count 
FROM interactions 
WHERE interaction_type = 'VIEW' 
GROUP BY offer_id 
ORDER BY view_count DESC;

-- User engagement analysis
SELECT 
    consumer_id,
    COUNT(*) as total_interactions,
    COUNT(CASE WHEN interaction_type = 'VIEW' THEN 1 END) as views,
    COUNT(CASE WHEN interaction_type = 'REDEEM' THEN 1 END) as redemptions
FROM interactions 
GROUP BY consumer_id;

-- Device analysis
SELECT 
    CASE 
        WHEN device_info LIKE '%Mobile%' THEN 'Mobile'
        WHEN device_info LIKE '%Desktop%' THEN 'Desktop'
        ELSE 'Unknown'
    END as device_type,
    COUNT(*) as interaction_count
FROM interactions 
GROUP BY device_type;
```

---

## 🚀 Running All Services

### **Method 1: Individual Services**
```bash
# Terminal 1: Consumer Service
cd Backend/consumer-service && mvn spring-boot:run

# Terminal 2: Retailer Service
cd Backend/retailer-service && mvn spring-boot:run

# Terminal 3: Category Service
cd Backend/category-service && mvn spring-boot:run

# Terminal 4: Offer Service
cd Backend/offer-service && mvn spring-boot:run

# Terminal 5: Interaction Service
cd Backend/interaction-service && mvn spring-boot:run
```

### **Method 2: Build Script**
```bash
cd Backend
chmod +x start-services.sh
./start-services.sh
```

### **Service Health Check**
```bash
# Check all services are running
curl http://localhost:8081  # Consumer Service
curl http://localhost:8082  # Retailer Service
curl http://localhost:8083  # Category Service
curl http://localhost:8084  # Offer Service
curl http://localhost:8085  # Interaction Service
```

---

## 🗄️ Database Access Guide

### **H2 Console Access for Each Service**

| Service | Console URL | JDBC URL | Username | Password |
|---------|-------------|----------|----------|----------|
| Consumer | http://localhost:8081/h2-console | `jdbc:h2:mem:consumerdb` | `sa` | (empty) |
| Retailer | http://localhost:8082/h2-console | `jdbc:h2:mem:retailerdb` | `sa` | (empty) |
| Category | http://localhost:8083/h2-console | `jdbc:h2:mem:categorydb` | `sa` | (empty) |
| Offer | http://localhost:8084/h2-console | `jdbc:h2:mem:offerdb` | `sa` | (empty) |
| Interaction | http://localhost:8085/h2-console | `jdbc:h2:mem:interactiondb` | `sa` | (empty) |

### **Connection Steps**
1. Open the console URL in your browser
2. Enter the JDBC URL for the specific service
3. Username: `sa`
4. Password: (leave empty)
5. Click "Connect"

---

## 🔮 API Endpoints (Future Implementation)

### **Consumer Service API**
```
GET    /api/consumers           - List all consumers
POST   /api/consumers           - Create new consumer
GET    /api/consumers/{id}      - Get consumer by ID
PUT    /api/consumers/{id}      - Update consumer
DELETE /api/consumers/{id}      - Delete consumer
```

### **Retailer Service API**
```
GET    /api/retailers           - List all retailers
POST   /api/retailers           - Register new retailer
GET    /api/retailers/{id}      - Get retailer by ID
PUT    /api/retailers/{id}      - Update retailer
POST   /api/retailers/{id}/approve - Approve retailer
```

### **Category Service API**
```
GET    /api/categories          - List all categories
POST   /api/categories          - Create new category
GET    /api/categories/{id}     - Get category by ID
PUT    /api/categories/{id}     - Update category
DELETE /api/categories/{id}     - Delete category
```

### **Offer Service API**
```
GET    /api/offers              - List all offers
POST   /api/offers              - Create new offer
GET    /api/offers/{id}         - Get offer by ID
PUT    /api/offers/{id}         - Update offer
GET    /api/offers/active       - Get active offers
GET    /api/offers/category/{categoryId} - Get offers by category
```

### **Interaction Service API**
```
POST   /api/interactions        - Record new interaction
GET    /api/interactions/analytics - Get analytics data
GET    /api/interactions/popular - Get popular offers
GET    /api/interactions/consumer/{id} - Get consumer interactions
```

---

## 🛠️ Troubleshooting

### **Common Issues and Solutions**

#### **Issue 1: Port Already in Use**
```
Error: Port 8081 is already in use
```
**Solution:**
```bash
# Find process using the port
lsof -i :8081

# Kill the process
kill -9 <PID>

# Or use different port in application.yml
server:
  port: 8091
```

#### **Issue 2: Maven Build Failures**
```
[ERROR] Compilation failure
```
**Solution:**
```bash
# Clean and rebuild
mvn clean compile

# Check Java version
java -version  # Should be 17+

# Check Maven version
mvn -version   # Should be 3.6+
```

#### **Issue 3: Database Connection Issues**
```
Unable to connect to H2 Console
```
**Solution:**
1. Ensure service is running
2. Check the correct JDBC URL
3. Verify H2 console is enabled in `application.yml`

#### **Issue 4: Service Won't Start**
```
Application failed to start
```
**Solution:**
```bash
# Check application logs
mvn spring-boot:run -X

# Verify all dependencies
mvn dependency:tree

# Check for conflicting configurations
```

### **Logs Location**
- **Console Output**: Real-time in terminal
- **Application Logs**: Check IDE console or terminal output
- **Database Logs**: Visible in H2 console

### **Performance Monitoring**
```bash
# Check memory usage
jps -v

# Monitor CPU usage
top -p <java-process-id>

# Check service health
curl http://localhost:808X/actuator/health
```

---

## 📊 Service Status Summary

When all services are running successfully, you should see:

```
✅ Consumer Service    - http://localhost:8081 - Managing Users
✅ Retailer Service    - http://localhost:8082 - Managing Businesses  
✅ Category Service    - http://localhost:8083 - Managing Categories
✅ Offer Service       - http://localhost:8084 - Managing Offers
✅ Interaction Service - http://localhost:8085 - Tracking Analytics

💾 All databases initialized with proper schema
🔧 H2 consoles accessible for each service
📊 Ready for API layer implementation
🚀 Microservice foundation complete
```

---

**🎉 Congratulations! Your OfferZone microservice backend is now fully operational!**

For additional support or feature requests, please refer to the project documentation or contact the development team.