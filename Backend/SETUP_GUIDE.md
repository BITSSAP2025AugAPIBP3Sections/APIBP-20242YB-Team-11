# 🚀 OfferZone Backend Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [System Requirements](#system-requirements)
3. [Installation Steps](#installation-steps)
4. [Project Structure](#project-structure)
5. [Starting Services](#starting-services)
6. [Testing Services](#testing-services)
7. [H2 Database Access](#h2-database-access)
8. [Troubleshooting](#troubleshooting)
9. [Service Details](#service-details)

---

## ✅ Prerequisites

Before setting up the OfferZone Backend, ensure you have the following installed:

### 🔧 Required Software:

1. **Java Development Kit (JDK) 17 or later**
   - Download from: https://adoptium.net/
   - Verify installation: `java -version`

2. **Apache Maven 3.6 or later**
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -version`

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

4. **Terminal/Command Prompt**
   - macOS: Terminal
   - Windows: Command Prompt or PowerShell
   - Linux: Terminal

---

## 💻 System Requirements

- **Operating System:** Windows 10+, macOS 10.14+, or Linux
- **RAM:** Minimum 8GB (16GB recommended)
- **Disk Space:** At least 2GB free space
- **Network:** Internet connection for downloading dependencies

---

## 📥 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/BITSSAP2025AugAPIBP3Sections/APIBP-20242YB-Team-11.git

# Navigate to the backend directory
cd APIBP-20242YB-Team-11/Backend
```

**Expected Output:**
```
Cloning into 'APIBP-20242YB-Team-11'...
remote: Enumerating objects: 150, done.
remote: Counting objects: 100% (150/150), done.
remote: Compressing objects: 100% (120/120), done.
remote: Total 150 (delta 30), reused 150 (delta 30), pack-reused 0
Receiving objects: 100% (150/150), 45.67 KiB | 1.52 MiB/s, done.
Resolving deltas: 100% (30/30), done.
```

### Step 2: Verify Project Structure

```bash
# List the backend services
ls -la
```

**Expected Output:**
```
drwxr-xr-x  7 user  staff   224 Nov  3 10:00 .
drwxr-xr-x  5 user  staff   160 Nov  3 10:00 ..
drwxr-xr-x  8 user  staff   256 Nov  3 10:00 brand-service
drwxr-xr-x  8 user  staff   256 Nov  3 10:00 consumer-service
drwxr-xr-x  8 user  staff   256 Nov  3 10:00 interaction-service
drwxr-xr-x  8 user  staff   256 Nov  3 10:00 product-service
drwxr-xr-x  8 user  staff   256 Nov  3 10:00 retailer-service
-rw-r--r--  1 user  staff  1234 Nov  3 10:00 README.md
```

### Step 3: Build All Services

```bash
# Build all services to download dependencies
for service in consumer-service retailer-service product-service brand-service interaction-service; do
    echo "Building $service..."
    cd $service
    mvn clean compile
    cd ..
done
```

**Expected Output for Each Service:**
```
[INFO] Scanning for projects...
[INFO] 
[INFO] -------------------< com.offerzone:consumer-service >-------------------
[INFO] Building consumer-service 1.0.0
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- clean:3.2.0:clean (default-clean) @ consumer-service ---
[INFO] --- resources:3.3.1:resources (default-resources) @ consumer-service ---
[INFO] --- compiler:3.11.0:compile (default-compile) @ consumer-service ---
[INFO] Compiling 6 source files with javac [debug release 17] to target/classes
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

---

## 🏗️ Project Structure

```
Backend/
├── consumer-service/          # Port 8081 - User Management
│   ├── src/main/java/com/offerzone/consumer/
│   │   ├── ConsumerServiceApplication.java
│   │   ├── config/StartupTestingGuide.java
│   │   ├── controller/ConsumerController.java
│   │   ├── model/Consumer.java
│   │   └── repository/ConsumerRepository.java
│   ├── src/main/resources/application.yml
│   └── pom.xml
├── retailer-service/          # Port 8082 - Business Management
├── product-service/           # Port 8083 - Product & Offers
├── brand-service/             # Port 8084 - Brands & Shops
└── interaction-service/       # Port 8085 - Analytics
```

---

## 🚀 Starting Services

### Important Notes:
- **Each service must run in a separate terminal**
- **Services run on different ports (8081-8085)**
- **Each service has its own H2 database**

### Method 1: Start All Services (Recommended)

Open **5 separate terminal windows/tabs** and run each command in a different terminal:

#### Terminal 1 - Consumer Service (Port 8081)
```bash
cd consumer-service
mvn spring-boot:run
```

#### Terminal 2 - Retailer Service (Port 8082)
```bash
cd retailer-service
mvn spring-boot:run
```

#### Terminal 3 - Product Service (Port 8083)
```bash
cd product-service
mvn spring-boot:run
```

#### Terminal 4 - Brand Service (Port 8084)
```bash
cd brand-service
mvn spring-boot:run
```

#### Terminal 5 - Interaction Service (Port 8085)
```bash
cd interaction-service
mvn spring-boot:run
```

### Expected Startup Output for Each Service:

**Consumer Service (8081):**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

2025-11-03T10:30:15.123+05:30  INFO 12345 --- [main] c.o.consumer.ConsumerServiceApplication  : Starting ConsumerServiceApplication
2025-11-03T10:30:16.456+05:30  INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8081 (http)
2025-11-03T10:30:16.789+05:30  INFO 12345 --- [main] c.o.consumer.ConsumerServiceApplication  : Started ConsumerServiceApplication in 1.666 seconds

================================================================================
🚀 CONSUMER SERVICE SUCCESSFULLY STARTED! 🚀
================================================================================

📋 SERVICE INFORMATION:
   Service: CONSUMER-SERVICE
   Port: 8081
   Database: consumerdb
   Base URL: http://localhost:8081
   H2 Console: http://localhost:8081/h2-console

🔐 H2 DATABASE CONNECTION DETAILS:
   JDBC URL: jdbc:h2:mem:consumerdb
   Username: sa
   Password: (leave empty)
   Driver: org.h2.Driver

✨ Service is ready for testing! ✨
```

**Similar output will appear for all other services with their respective ports and database names.**

### Method 2: Verify All Services Are Running

In a new terminal, check if all services are running:

```bash
# Check service status
for port in 8081 8082 8083 8084 8085; do
    echo -n "Port $port: "
    lsof -ti :$port >/dev/null 2>&1 && echo "✅ RUNNING" || echo "❌ STOPPED"
done
```

**Expected Output:**
```
Port 8081: ✅ RUNNING
Port 8082: ✅ RUNNING
Port 8083: ✅ RUNNING
Port 8084: ✅ RUNNING
Port 8085: ✅ RUNNING
```

---

## 🧪 Testing Services

### Quick Health Check

Test if services are responding:

```bash
# Test Consumer Service
curl -X GET http://localhost:8081/ -s | head -1

# Test Retailer Service
curl -X GET http://localhost:8082/ -s | head -1

# Test Product Service
curl -X GET http://localhost:8083/ -s | head -1

# Test Brand Service
curl -X GET http://localhost:8084/ -s | head -1

# Test Interaction Service
curl -X GET http://localhost:8085/ -s | head -1
```

**Expected Output (404 is normal - REST endpoints not implemented yet):**
```
{"timestamp":"2025-11-03T05:00:00.000+00:00","status":404,"error":"Not Found","path":"/"}
```

---

## 🗄️ H2 Database Access

Each service has its own H2 database console for data inspection:

### Access Steps:

1. **Open Browser**
2. **Navigate to Service H2 Console**
3. **Enter Connection Details**
4. **Click Connect**
5. **Execute SQL Queries**

### Service-Specific H2 Console Access:

#### Consumer Service Database
- **URL:** http://localhost:8081/h2-console
- **JDBC URL:** `jdbc:h2:mem:consumerdb`
- **Username:** `sa`
- **Password:** (leave empty)
- **Table:** `consumers`

#### Retailer Service Database
- **URL:** http://localhost:8082/h2-console
- **JDBC URL:** `jdbc:h2:mem:retailerdb`
- **Username:** `sa`
- **Password:** (leave empty)
- **Table:** `retailers`

#### Product Service Database
- **URL:** http://localhost:8083/h2-console
- **JDBC URL:** `jdbc:h2:mem:productdb`
- **Username:** `sa`
- **Password:** (leave empty)
- **Table:** `products`

#### Brand Service Database
- **URL:** http://localhost:8084/h2-console
- **JDBC URL:** `jdbc:h2:mem:branddb`
- **Username:** `sa`
- **Password:** (leave empty)
- **Table:** `brands`

#### Interaction Service Database
- **URL:** http://localhost:8085/h2-console
- **JDBC URL:** `jdbc:h2:mem:interactiondb`
- **Username:** `sa`
- **Password:** (leave empty)
- **Table:** `interactions`

### Sample SQL Queries:

```sql
-- Check table structure
SHOW COLUMNS FROM consumers;

-- Count records
SELECT COUNT(*) FROM consumers;

-- View all data
SELECT * FROM consumers;

-- Check database info
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC';
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### 1. Port Already in Use
**Error:** `Port 8081 was already in use`

**Solution:**
```bash
# Kill process on specific port
lsof -ti :8081 | xargs kill -9

# Or kill all Java processes
pkill -f java
```

#### 2. Java Version Issues
**Error:** `java.lang.UnsupportedClassVersionError`

**Solution:**
```bash
# Check Java version
java -version

# Should show Java 17 or later
# If not, install correct version and update JAVA_HOME
export JAVA_HOME=/path/to/java17
```

#### 3. Maven Build Failures
**Error:** `[ERROR] Failed to execute goal`

**Solution:**
```bash
# Clean and rebuild
mvn clean install

# Skip tests if needed
mvn clean install -DskipTests
```

#### 4. H2 Console Access Issues
**Problem:** Can't connect to H2 database

**Solution:**
- Ensure service is running
- Clear browser cache
- Use incognito/private browsing mode
- Check JDBC URL is exactly: `jdbc:h2:mem:{servicename}db`

#### 5. Services Won't Start
**Problem:** Services fail to start

**Checklist:**
1. Verify Java 17+ is installed
2. Check Maven is properly configured
3. Ensure no other applications are using ports 8081-8085
4. Check firewall settings
5. Verify project structure is intact

---

## 📊 Service Details

### Service Architecture Overview:

```
┌─────────────────────────────────────────────────────────┐
│                  OFFERZONE BACKEND                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👤 Consumer Service (8081)    🏢 Retailer Service (8082) │
│     ├── User Management           ├── Business Accounts   │
│     ├── Profile Data              ├── Subscription Plans  │
│     └── Preferences               └── Status Management   │
│                                                         │
│  🛍️ Product Service (8083)     🏷️ Brand Service (8084)    │
│     ├── Product Catalog           ├── Global Brands       │
│     ├── Integrated Offers         ├── Local Shops         │
│     └── Inventory Management      └── Brand Management    │
│                                                         │
│  📊 Interaction Service (8085)                           │
│     ├── User Analytics                                   │
│     ├── Behavior Tracking                                │
│     └── Business Intelligence                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack:
- **Framework:** Spring Boot 3.1.5
- **Java Version:** 17
- **Database:** H2 In-Memory
- **Build Tool:** Maven
- **Architecture:** Microservices

### Database Schemas:

#### Consumers Table (Consumer Service)
```sql
CREATE TABLE consumers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(200),
    status VARCHAR(255) CHECK (status IN ('ACTIVE','INACTIVE','SUSPENDED','DELETED')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

#### Retailers Table (Retailer Service)
```sql
CREATE TABLE retailers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(300),
    description VARCHAR(500),
    subscription_plan VARCHAR(255) CHECK (subscription_plan IN ('FREE','BASIC','PREMIUM','ENTERPRISE')),
    status VARCHAR(255) CHECK (status IN ('PENDING','ACTIVE','INACTIVE','SUSPENDED','DELETED')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

#### Products Table (Product Service)
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
    is_offer_active BOOLEAN,
    category VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    stock_quantity INTEGER CHECK (stock_quantity >= 0),
    max_redemptions INTEGER CHECK (max_redemptions >= 0),
    current_redemptions INTEGER CHECK (current_redemptions >= 0),
    offer_terms VARCHAR(500),
    is_featured BOOLEAN,
    status VARCHAR(255) CHECK (status IN ('ACTIVE','INACTIVE','OUT_OF_STOCK','DISCONTINUED','DRAFT')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

#### Brands Table (Brand Service)
```sql
CREATE TABLE brands (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    brand_type VARCHAR(255) CHECK (brand_type IN ('BRAND','SHOP')),
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    contact_email VARCHAR(150),
    contact_phone VARCHAR(15),
    address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    country VARCHAR(100),
    operating_hours VARCHAR(500),
    category VARCHAR(100),
    rating FLOAT,
    review_count INTEGER CHECK (review_count >= 0),
    is_verified BOOLEAN,
    is_featured BOOLEAN,
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    twitter_url VARCHAR(500),
    status VARCHAR(255) CHECK (status IN ('ACTIVE','INACTIVE','PENDING_VERIFICATION','SUSPENDED','CLOSED')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

#### Interactions Table (Interaction Service)
```sql
CREATE TABLE interactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    consumer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    retailer_id BIGINT,
    brand_id BIGINT,
    interaction_type VARCHAR(255) CHECK (interaction_type IN ('VIEW','SAVE','UNSAVE','SHARE','REDEEM','CLICK','SEARCH','FILTER')),
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    device_info VARCHAR(200),
    page_url VARCHAR(500),
    referrer_url VARCHAR(500),
    interaction_data VARCHAR(500),
    created_at TIMESTAMP NOT NULL
);
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore H2 Databases** - Use the web consoles to inspect database schemas
2. **Implement REST Controllers** - Add API endpoints for each service
3. **Add Data Validation** - Implement proper validation and error handling
4. **Service Communication** - Set up inter-service communication
5. **Frontend Integration** - Connect with React frontend
6. **Testing** - Add unit and integration tests
7. **Documentation** - Create API documentation
8. **Deployment** - Prepare for production deployment

---

## 📞 Support

If you encounter any issues:

1. **Check this guide** for common solutions
2. **Review service logs** in the terminal outputs
3. **Verify prerequisites** are properly installed
4. **Check port availability** for conflicts
5. **Restart services** if needed

---

## 🏆 Success Indicators

You've successfully set up the OfferZone Backend when:

- ✅ All 5 services start without errors
- ✅ Each service displays its startup testing guide
- ✅ All ports (8081-8085) show as running
- ✅ H2 consoles are accessible for each service
- ✅ Database tables are created automatically
- ✅ Services respond to health check requests

**🎉 Congratulations! Your OfferZone Backend is ready for development!**