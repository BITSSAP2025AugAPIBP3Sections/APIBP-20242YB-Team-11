# 🔧 OfferZone Backend - Quick Reference Card

## 🚀 **Essential Commands**

### Start All Services (5 separate terminals required)
```bash
# Terminal 1 - Consumer Service
cd consumer-service && mvn spring-boot:run

# Terminal 2 - Retailer Service  
cd retailer-service && mvn spring-boot:run

# Terminal 3 - Product Service
cd product-service && mvn spring-boot:run

# Terminal 4 - Brand Service
cd brand-service && mvn spring-boot:run

# Terminal 5 - Interaction Service
cd interaction-service && mvn spring-boot:run
```

### Check Service Status
```bash
for port in 8081 8082 8083 8084 8085; do
    echo -n "Port $port: "
    lsof -ti :$port >/dev/null 2>&1 && echo "✅ RUNNING" || echo "❌ STOPPED"
done
```

### Stop All Services
```bash
for port in 8081 8082 8083 8084 8085; do
    lsof -ti :$port | xargs kill -9 2>/dev/null
done
```

---

## 🗄️ **H2 Database Access**

| Service | Port | H2 Console URL | JDBC URL |
|---------|------|----------------|----------|
| Consumer | 8081 | http://localhost:8081/h2-console | `jdbc:h2:mem:consumerdb` |
| Retailer | 8082 | http://localhost:8082/h2-console | `jdbc:h2:mem:retailerdb` |
| Product | 8083 | http://localhost:8083/h2-console | `jdbc:h2:mem:productdb` |
| Brand | 8084 | http://localhost:8084/h2-console | `jdbc:h2:mem:branddb` |
| Interaction | 8085 | http://localhost:8085/h2-console | `jdbc:h2:mem:interactiondb` |

**Credentials for all databases:**
- Username: `sa`
- Password: (empty)

---

## 🔧 **Troubleshooting**

### Port Already in Use
```bash
# Kill specific port
lsof -ti :8081 | xargs kill -9

# Kill all Java processes
pkill -f java
```

### Build Issues
```bash
# Clean build
mvn clean compile

# Skip tests
mvn clean compile -DskipTests
```

### H2 Access Issues
- Clear browser cache
- Use incognito mode
- Ensure service is running
- Check exact JDBC URL

---

## 📊 **Service Information**

- **Framework:** Spring Boot 3.1.5
- **Java Version:** 17+
- **Database:** H2 In-Memory
- **Build Tool:** Maven
- **Architecture:** Microservices

**For complete setup guide, see: [SETUP_GUIDE.md](./SETUP_GUIDE.md)**