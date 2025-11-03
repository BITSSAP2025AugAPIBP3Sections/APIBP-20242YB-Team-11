package com.offerzone.product.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StartupTestingGuide {

    @Bean
    public ApplicationRunner displayTestingGuide() {
        return args -> {
            System.out.println("\n================================================================================");
            System.out.println("🚀 PRODUCT SERVICE SUCCESSFULLY STARTED! 🚀");
            System.out.println("================================================================================");
            System.out.println();
            System.out.println("📋 SERVICE INFORMATION:");
            System.out.println("   Service: PRODUCT-SERVICE");
            System.out.println("   Port: 8083");
            System.out.println("   Database: productdb");
            System.out.println("   Base URL: http://localhost:8083");
            System.out.println("   H2 Console: http://localhost:8083/h2-console");
            System.out.println();
            System.out.println("🔐 H2 DATABASE CONNECTION DETAILS:");
            System.out.println("   JDBC URL: jdbc:h2:mem:productdb");
            System.out.println("   Username: sa");
            System.out.println("   Password: (leave empty)");
            System.out.println("   Driver: org.h2.Driver");
            System.out.println();
            System.out.println("🛠️  REST API ENDPOINTS:");
            System.out.println("   GET    http://localhost:8083/api/products          - Get all products");
            System.out.println("   GET    http://localhost:8083/api/products/{id}     - Get product by ID");
            System.out.println("   POST   http://localhost:8083/api/products          - Create new product");
            System.out.println("   PUT    http://localhost:8083/api/products/{id}     - Update product");
            System.out.println("   DELETE http://localhost:8083/api/products/{id}     - Delete product");
            System.out.println();
            System.out.println("📝 SAMPLE JSON FOR POST/PUT (Products with Integrated Offers):");
            System.out.println("   {");
            System.out.println("       \"name\": \"iPhone 15 Pro\",");
            System.out.println("       \"description\": \"Latest iPhone with amazing features\",");
            System.out.println("       \"retailerId\": 1,");
            System.out.println("       \"brandId\": 1,");
            System.out.println("       \"originalPrice\": 999.99,");
            System.out.println("       \"offerPrice\": 799.99,");
            System.out.println("       \"offerStartDate\": \"2024-01-01T00:00:00\",");
            System.out.println("       \"offerEndDate\": \"2024-12-31T23:59:59\",");
            System.out.println("       \"isOfferActive\": true,");
            System.out.println("       \"category\": \"Electronics\",");
            System.out.println("       \"sku\": \"IPHONE15PRO\",");
            System.out.println("       \"stockQuantity\": 100,");
            System.out.println("       \"maxRedemptions\": 50,");
            System.out.println("       \"offerTerms\": \"Limited time offer\",");
            System.out.println("       \"status\": \"ACTIVE\"");
            System.out.println("   }");
            System.out.println();
            System.out.println("🔧 QUICK CURL TESTING COMMANDS:");
            System.out.println("   # Get all products");
            System.out.println("   curl -X GET http://localhost:8083/api/products");
            System.out.println();
            System.out.println("   # Create a new product with offer");
            System.out.println("   curl -X POST http://localhost:8083/api/products \\");
            System.out.println("        -H \"Content-Type: application/json\" \\");
            System.out.println("        -d '{\"name\":\"Sample Product\",\"originalPrice\":100,\"offerPrice\":80,\"isOfferActive\":true}'");
            System.out.println();
            System.out.println("🧪 TESTING STEPS:");
            System.out.println("   1. 🌐 Open browser: http://localhost:8083/h2-console");
            System.out.println("   2. 🔗 Use JDBC URL: jdbc:h2:mem:productdb");
            System.out.println("   3. 📊 Check 'products' table: SELECT * FROM products");
            System.out.println("   4. 🔄 Test APIs using curl commands above");
            System.out.println("   5. ✅ Verify offer calculations work automatically");
            System.out.println();
            System.out.println("💡 SPECIAL FEATURES:");
            System.out.println("   - Integrated Offers: No separate offer entity needed");
            System.out.println("   - Auto Discount Calculation: Updates when prices change");
            System.out.println("   - Offer Validation: Checks dates, redemptions, stock");
            System.out.println("   - Effective Price: Returns offer price when valid, original otherwise");
            System.out.println();
            System.out.println("================================================================================");
            System.out.println("✨ Product Service with Integrated Offers is ready for testing! ✨");
            System.out.println("================================================================================");
        };
    }
}