# 🚀 OfferZone Backend - Microservices Architecture

## 📖 **COMPLETE SETUP GUIDE**
**👉 For detailed setup instructions, see: [SETUP_GUIDE.md](./SETUP_GUIDE.md) 👈**

---

## ✅ Updated Codebase Summary

Based on your requirements, the codebase has been simplified to contain only these **5 core services**:

### 🏗️ **Core Services Architecture**

```
Backend/
├── consumer-service/     (Port 8081) - End users
├── retailer-service/     (Port 8082) - Business owners  
├── product-service/      (Port 8083) - Products with integrated offers
├── brand-service/        (Port 8084) - Brands & Shops (combined)
└── interaction-service/  (Port 8085) - User interactions
```

---

## 🚀 **Quick Start**

1. **Clone the repository**
2. **See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup instructions**
3. **Start all 5 services in separate terminals**
4. **Access H2 databases on ports 8081-8085**

---

## 📊 **Entity Models Overview**

### 1. **Consumer** (Port 8081)
- **Purpose**: Manages end-users who browse and redeem offers
- **Database**: `consumerdb`
- **Key Fields**: name, email, phone, address, status, timestamps
- **Status**: ACTIVE, INACTIVE, SUSPENDED, DELETED

### 2. **Retailer** (Port 8082)  
- **Purpose**: Manages business owners who create products/offers
- **Database**: `retailerdb`
- **Key Fields**: businessName, ownerName, email, subscriptionPlan, status
- **Plans**: FREE, BASIC, PREMIUM, ENTERPRISE

### 3. **Product** (Port 8083) - **NEW INTEGRATED MODEL**
- **Purpose**: Products with **built-in offers** - No separate Offer entity needed
- **Database**: `productdb`
- **Key Features**:
  - Original price + Offer price (integrated)
  - Automatic discount percentage calculation
  - Offer validity periods
  - Stock management
  - Redemption tracking
  - Category classification
  - Brand and Retailer associations

### 4. **Brand** (Port 8084) - **COMBINED ENTITY**
- **Purpose**: Brands AND Shops in one entity (no separate entities)
- **Database**: `branddb`
- **Key Features**:
  - `BrandType`: BRAND (global) or SHOP (local)
  - Location details for shops
  - Brand information for global brands
  - Rating and verification system
  - Social media integration

### 5. **Interaction** (Port 8085) - **UPDATED**
- **Purpose**: Tracks user interactions with products
- **Database**: `interactiondb`
- **Updated Fields**: consumerId, **productId** (not offerId), retailerId, brandId
- **Types**: VIEW, SAVE, REDEEM, CLICK, SEARCH, FILTER

---

## 🗑️ **Removed Services**

- ❌ **category-service** - Categories now handled as string fields in Product
- ❌ **offer-service** - Offers integrated into Product entity

---

## 🔄 **Key Changes Made**

### **Product Service - New Integrated Model**
```java
// Product now contains offer functionality
@Entity
public class Product {
    private BigDecimal originalPrice;
    private BigDecimal offerPrice;        // Integrated offer
    private LocalDateTime offerStartDate; // Offer validity
    private LocalDateTime offerEndDate;
    private Boolean isOfferActive;
    private Integer maxRedemptions;
    private Integer currentRedemptions;
    
    // Business methods for offer management
    public void calculateDiscountPercentage() { ... }
    public boolean isOfferValid() { ... }
    public boolean canRedeem() { ... }
}
```

### **Brand Service - Combined Brand & Shop**
```java
@Entity  
public class Brand {
    @Enumerated(EnumType.STRING)
    private BrandType brandType; // BRAND or SHOP
    
    // Brand fields
    private String name, logoUrl, websiteUrl;
    
    // Shop/Location fields  
    private String address, city, state, zipCode;
    private String operatingHours;
    private Double rating;
}
```

### **Interaction Service - Updated References**
```java
@Entity
public class Interaction {
    private Long consumerId;
    private Long productId;  // Changed from offerId
    private Long retailerId; // For analytics
    private Long brandId;    // For analytics
}
```

---

## 🚀 **Testing Each Service**

When you run `mvn spring-boot:run` for each service, you'll see:

### **Automatic Testing Guide Display**
Each service now shows comprehensive testing information including:
- ✅ H2 Database connection details
- ✅ All REST API endpoints
- ✅ Sample JSON for testing
- ✅ Curl command examples  
- ✅ Step-by-step testing instructions

### **Service URLs**
- Consumer Service: http://localhost:8081
- Retailer Service: http://localhost:8082  
- Product Service: http://localhost:8083
- Brand Service: http://localhost:8084
- Interaction Service: http://localhost:8085

### **H2 Console Access**
- Consumer: http://localhost:8081/h2-console (jdbc:h2:mem:consumerdb)
- Retailer: http://localhost:8082/h2-console (jdbc:h2:mem:retailerdb)
- Product: http://localhost:8083/h2-console (jdbc:h2:mem:productdb)
- Brand: http://localhost:8084/h2-console (jdbc:h2:mem:branddb)
- Interaction: http://localhost:8085/h2-console (jdbc:h2:mem:interactiondb)

---

## 🎯 **Benefits of Simplified Architecture**

1. **Reduced Complexity** - From 7 services to 5 services
2. **Integrated Offers** - No need for separate offer management
3. **Unified Brand/Shop** - Single entity for both global brands and local shops
4. **Better Performance** - Fewer inter-service calls
5. **Easier Maintenance** - Less code to maintain
6. **Clear Responsibilities** - Each service has well-defined purpose

---

## 🔧 **Next Steps**

1. **Start Services**: Run `mvn spring-boot:run` in each service directory
2. **Test APIs**: Use the displayed curl commands or Postman
3. **Verify Databases**: Check H2 console for each service
4. **Create Test Data**: Use the sample JSON provided in testing guides





--------------------------------------------------------------------------------------------------------

# 🏗️ OfferZone Backend Services - Microservices Description and working

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Service Architecture](#service-architecture)
- [Service Details](#service-details)
  - [1. Consumer Service](#1-consumer-service)
  - [2. Retailer Service](#2-retailer-service)
  - [3. Product Service](#3-product-service)
  - [4. Brand Service](#4-brand-service)
  - [5. Interaction Service](#5-interaction-service)
- [Running the Services](#running-the-services)
- [Database Access](#database-access)
- [API Endpoints (Future)](#api-endpoints-future)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

OfferZone is a simplified microservice-based offer management platform with 5 core services:
- **Consumer Service**: Manages end-users
- **Retailer Service**: Manages businesses
- **Product Service**: Manages products with integrated offers
- **Brand Service**: Manages brands and shops (combined entity)
- **Interaction Service**: Tracks user analytics

## ⚙️ Prerequisites

- **Java 17+** (OpenJDK or Oracle JDK)
- **Maven 3.6+** (Build tool)
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)
- **Web Browser** (For H2 Console access)

## 🏛️ Service Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Consumer Service│    │ Retailer Service│    │ Product Service │
│    Port: 8081   │    │    Port: 8082   │    │    Port: 8083   │
│   DB: consumerdb│    │   DB: retailerdb│    │   DB: productdb │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────┐    ┌─┴───────────────┐
         │  Brand Service  │    │ Interaction     │
         │   Port: 8084    │    │ Service         │
         │   DB: branddb   │    │ Port: 8085      │
         └─────────────────┘    │ DB: interactiondb│
                                └─────────────────┘
```

**🆕 Key Changes from Previous Architecture:**
- ❌ **Removed Category Service** - Categories now handled as string fields in Product
- ❌ **Removed Offer Service** - Offers integrated directly into Product entity
- ✅ **Added Product Service** - Products with built-in offer functionality
- ✅ **Updated Brand Service** - Combines both brands and shops in one entity
- ✅ **Updated Interaction Service** - Uses productId instead of offerId

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

## 3. � Product Service

### **Purpose**
Manages products with integrated offer functionality. No separate offer entity needed.

### **Port & Database**
- **Port**: 8083
- **Database**: H2 in-memory (`productdb`)
- **Console**: http://localhost:8083/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate to Service Directory**
```bash
cd Backend/product-service
```

#### **Step 2: Build the Service**
```bash
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: 3.2 s
[INFO] Finished at: 2025-11-03T14:30:45+05:30
```

#### **Step 3: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
================================================================================
🚀 PRODUCT SERVICE SUCCESSFULLY STARTED! 🚀
================================================================================

📋 SERVICE INFORMATION:
   Service: PRODUCT-SERVICE
   Port: 8083
   Database: productdb
   Base URL: http://localhost:8083
   H2 Console: http://localhost:8083/h2-console

🔐 H2 DATABASE CONNECTION DETAILS:
   JDBC URL: jdbc:h2:mem:productdb
   Username: sa
   Password: (leave empty)

🛠️  REST API ENDPOINTS:
   GET    http://localhost:8083/api/products          - Get all products
   GET    http://localhost:8083/api/products/{id}     - Get product by ID
   POST   http://localhost:8083/api/products          - Create new product
   PUT    http://localhost:8083/api/products/{id}     - Update product
   DELETE http://localhost:8083/api/products/{id}     - Delete product

💡 SPECIAL FEATURES:
   - Integrated Offers: No separate offer entity needed
   - Auto Discount Calculation: Updates when prices change
   - Offer Validation: Checks dates, redemptions, stock
   - Effective Price: Returns offer price when valid, original otherwise
```

### **🗄️ Database Schema**
The service creates the following table structure with integrated offer functionality:

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    retailer_id BIGINT NOT NULL,
    brand_id BIGINT NOT NULL,
    original_price DECIMAL(12,2) NOT NULL,
    offer_price DECIMAL(12,2),
    discount_percentage DECIMAL(5,2),
    offer_start_date TIMESTAMP,
    offer_end_date TIMESTAMP,
    offer_terms VARCHAR(500),
    stock_quantity INTEGER,
    sku VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_offer_active BOOLEAN DEFAULT FALSE,
    max_redemptions INTEGER,
    current_redemptions INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','OUT_OF_STOCK','DISCONTINUED','DRAFT')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **� Database Access**
1. **Open H2 Console**: http://localhost:8083/h2-console
2. **Connection Details**:
   - **JDBC URL**: `jdbc:h2:mem:productdb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. **Click Connect**

### **�📊 Sample Data Operations**
```sql
-- Insert a product with offer
INSERT INTO products (name, description, retailer_id, brand_id, original_price, offer_price, offer_start_date, offer_end_date, is_offer_active, category, sku, stock_quantity, max_redemptions, status, created_at, updated_at) 
VALUES ('iPhone 15 Pro', 'Latest iPhone with amazing features', 1, 1, 999.99, 799.99, NOW(), DATEADD('DAY', 30, NOW()), TRUE, 'Electronics', 'IPHONE15PRO', 100, 50, 'ACTIVE', NOW(), NOW());

-- View products with calculated effective prices
SELECT 
    name,
    original_price,
    offer_price,
    CASE 
        WHEN is_offer_active = TRUE AND offer_start_date <= NOW() AND offer_end_date >= NOW() THEN offer_price
        ELSE original_price
    END AS effective_price,
    discount_percentage,
    status
FROM products 
WHERE status = 'ACTIVE';

-- Check offer validity
SELECT 
    name,
    is_offer_active,
    offer_start_date,
    offer_end_date,
    CASE 
        WHEN is_offer_active = TRUE AND offer_start_date <= NOW() AND offer_end_date >= NOW() THEN 'VALID'
        ELSE 'INVALID'
    END AS offer_status
FROM products;

-- Track redemptions
UPDATE products SET current_redemptions = current_redemptions + 1 WHERE id = 1;
```

---

## 4. � Brand Service

### **Purpose**
Manages both global brands and local shops in a single unified entity.

### **Port & Database**
- **Port**: 8084
- **Database**: H2 in-memory (`branddb`)
- **Console**: http://localhost:8084/h2-console

### **📋 Step-by-Step Procedure**

#### **Step 1: Navigate and Build**
```bash
cd Backend/brand-service
mvn clean install
```

#### **Step 2: Run the Service**
```bash
mvn spring-boot:run
```

**Expected Output:**
```
================================================================================
🚀 BRAND SERVICE SUCCESSFULLY STARTED! 🚀
================================================================================

📋 SERVICE INFORMATION:
   Service: BRAND-SERVICE
   Port: 8084
   Database: branddb
   Base URL: http://localhost:8084
   H2 Console: http://localhost:8084/h2-console

💡 SPECIAL FEATURES:
   - Combined Entity: Brands and Shops in one table
   - Brand Type: BRAND (global) or SHOP (local)
   - Smart Fields: Logo/website for brands, address/hours for shops
   - Rating System: Supports ratings and verification
```

### **🗄️ Database Schema**
```sql
CREATE TABLE brands (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    contact_email VARCHAR(150),
    contact_phone VARCHAR(15),
    address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    country VARCHAR(100),
    brand_type VARCHAR(20) NOT NULL CHECK (brand_type IN ('BRAND','SHOP')),
    category VARCHAR(100),
    rating DECIMAL(2,1),
    review_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    operating_hours VARCHAR(500),
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    twitter_url VARCHAR(500),
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','PENDING_VERIFICATION','SUSPENDED','CLOSED')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### **📊 Sample Data Operations**
```sql
-- Insert a global brand
INSERT INTO brands (name, description, brand_type, logo_url, website_url, contact_email, category, is_verified, status, created_at, updated_at) 
VALUES ('Nike', 'Global sportswear brand', 'BRAND', 'https://example.com/nike-logo.png', 'https://nike.com', 'contact@nike.com', 'Sportswear', TRUE, 'ACTIVE', NOW(), NOW());

-- Insert a local shop
INSERT INTO brands (name, description, brand_type, address, city, state, zip_code, contact_phone, operating_hours, category, rating, status, created_at, updated_at) 
VALUES ('Joe''s Pizza', 'Best pizza in town', 'SHOP', '123 Main Street', 'New York', 'NY', '10001', '1234567890', '9 AM - 11 PM', 'Restaurant', 4.5, 'ACTIVE', NOW(), NOW());

-- View brands vs shops
SELECT 
    name,
    brand_type,
    CASE 
        WHEN brand_type = 'BRAND' THEN website_url
        WHEN brand_type = 'SHOP' THEN CONCAT(city, ', ', state)
        ELSE 'N/A'
    END AS location_or_website,
    rating,
    status
FROM brands 
ORDER BY brand_type, name;

-- Get full address for shops
SELECT 
    name,
    CONCAT(
        COALESCE(address, ''), 
        CASE WHEN city IS NOT NULL THEN CONCAT(', ', city) ELSE '' END,
        CASE WHEN state IS NOT NULL THEN CONCAT(', ', state) ELSE '' END,
        CASE WHEN zip_code IS NOT NULL THEN CONCAT(' - ', zip_code) ELSE '' END
    ) AS full_address
FROM brands 
WHERE brand_type = 'SHOP' AND status = 'ACTIVE';
```

---

## 5. 📊 Interaction Service

### **Purpose**
Tracks all user interactions with products for analytics and personalization.

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
================================================================================
🚀 INTERACTION SERVICE SUCCESSFULLY STARTED! 🚀
================================================================================

📋 SERVICE INFORMATION:
   Service: INTERACTION-SERVICE
   Port: 8085
   Database: interactiondb
   Base URL: http://localhost:8085
   H2 Console: http://localhost:8085/h2-console

🔐 H2 DATABASE CONNECTION DETAILS:
   JDBC URL: jdbc:h2:mem:interactiondb
   Username: sa
   Password: (leave empty)

🛠️  REST API ENDPOINTS:
   GET    http://localhost:8085/api/interactions       - Get all interactions
   GET    http://localhost:8085/api/interactions/{id}  - Get interaction by ID
   POST   http://localhost:8085/api/interactions       - Create new interaction
   PUT    http://localhost:8085/api/interactions/{id}  - Update interaction
   DELETE http://localhost:8085/api/interactions/{id}  - Delete interaction
```

### **🗄️ Database Schema**
Updated to use productId instead of offerId:

```sql
CREATE TABLE interactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    consumer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    retailer_id BIGINT,
    brand_id BIGINT,
    interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('VIEW','SAVE','REDEEM','CLICK','SEARCH','FILTER')),
    interaction_data VARCHAR(500),
    device_info VARCHAR(200),
    ip_address VARCHAR(45),
    session_id VARCHAR(100),
    user_agent VARCHAR(500),
    referrer_url VARCHAR(500),
    page_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL
);
```

### **🔍 Database Access**
1. **Open H2 Console**: http://localhost:8085/h2-console
2. **Connection Details**:
   - **JDBC URL**: `jdbc:h2:mem:interactiondb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. **Click Connect**

### **📊 Sample Analytics Queries**
```sql
-- Insert sample interactions (using productId instead of offerId)
INSERT INTO interactions (consumer_id, product_id, retailer_id, brand_id, interaction_type, device_info, ip_address, session_id, created_at) VALUES 
(1, 1, 1, 1, 'VIEW', 'Chrome/120.0 Desktop', '192.168.1.100', 'session-001', NOW()),
(1, 1, 1, 1, 'SAVE', 'Chrome/120.0 Desktop', '192.168.1.100', 'session-001', NOW()),
(2, 1, 1, 1, 'VIEW', 'Safari/17.0 Mobile', '192.168.1.101', 'session-002', NOW()),
(2, 2, 1, 2, 'REDEEM', 'Safari/17.0 Mobile', '192.168.1.101', 'session-002', NOW());

-- Most popular products (by views)
SELECT 
    product_id, 
    COUNT(*) as view_count 
FROM interactions 
WHERE interaction_type = 'VIEW' 
GROUP BY product_id 
ORDER BY view_count DESC;

-- User engagement analysis
SELECT 
    consumer_id,
    COUNT(*) as total_interactions,
    COUNT(CASE WHEN interaction_type = 'VIEW' THEN 1 END) as views,
    COUNT(CASE WHEN interaction_type = 'REDEEM' THEN 1 END) as redemptions
FROM interactions 
GROUP BY consumer_id;

-- Brand performance analysis
SELECT 
    brand_id,
    COUNT(*) as total_interactions,
    COUNT(CASE WHEN interaction_type = 'VIEW' THEN 1 END) as views,
    COUNT(CASE WHEN interaction_type = 'REDEEM' THEN 1 END) as redemptions
FROM interactions 
WHERE brand_id IS NOT NULL
GROUP BY brand_id 
ORDER BY total_interactions DESC;

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

-- Retailer analytics
SELECT 
    retailer_id,
    COUNT(DISTINCT consumer_id) as unique_visitors,
    COUNT(*) as total_interactions,
    COUNT(CASE WHEN interaction_type = 'REDEEM' THEN 1 END) as conversions
FROM interactions 
WHERE retailer_id IS NOT NULL
GROUP BY retailer_id 
ORDER BY total_interactions DESC;
```

---

## 🚀 Running All Services

### **Method 1: Individual Services (Recommended)**
Each service displays comprehensive testing guides automatically:

```bash
# Terminal 1: Consumer Service
cd Backend/consumer-service && mvn spring-boot:run

# Terminal 2: Retailer Service
cd Backend/retailer-service && mvn spring-boot:run

# Terminal 3: Product Service (with integrated offers)
cd Backend/product-service && mvn spring-boot:run

# Terminal 4: Brand Service (brands + shops)
cd Backend/brand-service && mvn spring-boot:run

# Terminal 5: Interaction Service (updated)
cd Backend/interaction-service && mvn spring-boot:run
```

**🎯 What You'll See:**
Each service automatically displays:
- ✅ Complete service information
- ✅ H2 database connection details
- ✅ REST API endpoints
- ✅ Sample JSON for testing
- ✅ Ready-to-copy curl commands
- ✅ Step-by-step testing instructions

### **Method 2: All Services at Once**
```bash
cd Backend
chmod +x start-all-services.sh
./start-all-services.sh
```

### **Method 3: Stop All Services**
```bash
cd Backend
./stop-services.sh
```

### **Service Health Check**
```bash
# Check all services are running
curl http://localhost:8081  # Consumer Service
curl http://localhost:8082  # Retailer Service
curl http://localhost:8083  # Product Service (was Category)
curl http://localhost:8084  # Brand Service (was Offer)
curl http://localhost:8085  # Interaction Service
```

---

## 🗄️ Database Access Guide

### **H2 Console Access for Each Service**

| Service | Console URL | JDBC URL | Username | Password |
|---------|-------------|----------|----------|----------|
| Consumer | http://localhost:8081/h2-console | `jdbc:h2:mem:consumerdb` | `sa` | (empty) |
| Retailer | http://localhost:8082/h2-console | `jdbc:h2:mem:retailerdb` | `sa` | (empty) |
| Product | http://localhost:8083/h2-console | `jdbc:h2:mem:productdb` | `sa` | (empty) |
| Brand | http://localhost:8084/h2-console | `jdbc:h2:mem:branddb` | `sa` | (empty) |
| Interaction | http://localhost:8085/h2-console | `jdbc:h2:mem:interactiondb` | `sa` | (empty) |

### **Connection Steps**
1. Open the console URL in your browser
2. Enter the JDBC URL for the specific service
3. Username: `sa`
4. Password: (leave empty)
5. Click "Connect"

### **Database Tables Overview**
- **CONSUMERS** - User accounts with email, status, location preferences
- **RETAILERS** - Business accounts with subscription plans and status
- **PRODUCTS** - Products with integrated offers (original/offer pricing)
- **BRANDS** - Combined brands and shops with type classification
- **INTERACTIONS** - Product interaction analytics for business intelligence

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

### **Product Service API (with Integrated Offers)**
```
GET    /api/products            - List all products
POST   /api/products            - Create new product with offer
GET    /api/products/{id}       - Get product by ID
PUT    /api/products/{id}       - Update product/offer
DELETE /api/products/{id}       - Delete product
GET    /api/products/{id}/offer - Get offer details for product
PUT    /api/products/{id}/offer - Update offer pricing
```

### **Brand Service API (Brands + Shops)**
```
GET    /api/brands              - List all brands/shops
POST   /api/brands              - Create new brand/shop
GET    /api/brands/{id}         - Get brand/shop by ID
PUT    /api/brands/{id}         - Update brand/shop
GET    /api/brands/type/{type}  - Get by type (BRAND/SHOP)
```

### **Interaction Service API (Updated for Products)**
```
GET    /api/interactions        - List all interactions
POST   /api/interactions        - Record new interaction
GET    /api/interactions/product/{productId} - Get interactions for product
GET    /api/interactions/retailer/{retailerId} - Get interactions for retailer
POST   /api/interactions/analytics - Get analytics data
```
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
✅ Product Service     - http://localhost:8083 - Managing Products (with offers)
✅ Brand Service       - http://localhost:8084 - Managing Brands & Shops
✅ Interaction Service - http://localhost:8085 - Tracking Product Analytics

💾 All databases initialized with proper schema
🔧 H2 consoles accessible for each service
📊 Automatic testing guides active on startup
🚀 Simplified 5-service microservice architecture complete
```

### **Key Features of Updated Architecture:**
- 🎯 **Simplified Design**: Reduced from 7 to 5 core services
- 🛍️ **Integrated Offers**: Products include offer functionality directly
- 🏷️ **Combined Entities**: Brand service handles both brands and shops
- 📊 **Product Analytics**: Interactions track product engagement
- 🔄 **Auto-testing**: Comprehensive startup guides for immediate testing

---

**🎉 Congratulations! Your OfferZone simplified microservice backend is now fully operational!**

For additional support or feature requests, please refer to the project documentation or contact the development team.

The architecture is now streamlined and ready for development! 🎉