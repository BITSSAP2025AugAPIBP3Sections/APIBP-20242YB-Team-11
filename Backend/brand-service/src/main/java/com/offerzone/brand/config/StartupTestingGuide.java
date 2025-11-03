package com.offerzone.brand.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StartupTestingGuide {

    @Bean
    public ApplicationRunner displayTestingGuide() {
        return args -> {
            System.out.println("\n================================================================================");
            System.out.println("🚀 BRAND SERVICE SUCCESSFULLY STARTED! 🚀");
            System.out.println("================================================================================");
            System.out.println();
            System.out.println("📋 SERVICE INFORMATION:");
            System.out.println("   Service: BRAND-SERVICE");
            System.out.println("   Port: 8084");
            System.out.println("   Database: branddb");
            System.out.println("   Base URL: http://localhost:8084");
            System.out.println("   H2 Console: http://localhost:8084/h2-console");
            System.out.println();
            System.out.println("🔐 H2 DATABASE CONNECTION DETAILS:");
            System.out.println("   JDBC URL: jdbc:h2:mem:branddb");
            System.out.println("   Username: sa");
            System.out.println("   Password: (leave empty)");
            System.out.println("   Driver: org.h2.Driver");
            System.out.println();
            System.out.println("🛠️  REST API ENDPOINTS:");
            System.out.println("   GET    http://localhost:8084/api/brands             - Get all brands");
            System.out.println("   GET    http://localhost:8084/api/brands/{id}        - Get brand by ID");
            System.out.println("   POST   http://localhost:8084/api/brands             - Create new brand");
            System.out.println("   PUT    http://localhost:8084/api/brands/{id}        - Update brand");
            System.out.println("   DELETE http://localhost:8084/api/brands/{id}        - Delete brand");
            System.out.println();
            System.out.println("📝 SAMPLE JSON FOR POST/PUT (Brand Example):");
            System.out.println("   {");
            System.out.println("       \"name\": \"Nike\",");
            System.out.println("       \"description\": \"Global sportswear brand\",");
            System.out.println("       \"brandType\": \"BRAND\",");
            System.out.println("       \"logoUrl\": \"https://example.com/nike-logo.png\",");
            System.out.println("       \"websiteUrl\": \"https://nike.com\",");
            System.out.println("       \"contactEmail\": \"contact@nike.com\",");
            System.out.println("       \"category\": \"Sportswear\",");
            System.out.println("       \"isVerified\": true,");
            System.out.println("       \"status\": \"ACTIVE\"");
            System.out.println("   }");
            System.out.println();
            System.out.println("📝 SAMPLE JSON FOR POST/PUT (Shop Example):");
            System.out.println("   {");
            System.out.println("       \"name\": \"Joe's Pizza\",");
            System.out.println("       \"description\": \"Best pizza in town\",");
            System.out.println("       \"brandType\": \"SHOP\",");
            System.out.println("       \"address\": \"123 Main Street\",");
            System.out.println("       \"city\": \"New York\",");
            System.out.println("       \"state\": \"NY\",");
            System.out.println("       \"zipCode\": \"10001\",");
            System.out.println("       \"contactPhone\": \"1234567890\",");
            System.out.println("       \"operatingHours\": \"9 AM - 11 PM\",");
            System.out.println("       \"category\": \"Restaurant\",");
            System.out.println("       \"status\": \"ACTIVE\"");
            System.out.println("   }");
            System.out.println();
            System.out.println("🔧 QUICK CURL TESTING COMMANDS:");
            System.out.println("   # Get all brands");
            System.out.println("   curl -X GET http://localhost:8084/api/brands");
            System.out.println();
            System.out.println("   # Create a new brand");
            System.out.println("   curl -X POST http://localhost:8084/api/brands \\");
            System.out.println("        -H \"Content-Type: application/json\" \\");
            System.out.println("        -d '{\"name\":\"Sample Brand\",\"brandType\":\"BRAND\",\"description\":\"Test brand\"}'");
            System.out.println();
            System.out.println("   # Create a new shop");
            System.out.println("   curl -X POST http://localhost:8084/api/brands \\");
            System.out.println("        -H \"Content-Type: application/json\" \\");
            System.out.println("        -d '{\"name\":\"Local Shop\",\"brandType\":\"SHOP\",\"city\":\"New York\"}'");
            System.out.println();
            System.out.println("🧪 TESTING STEPS:");
            System.out.println("   1. 🌐 Open browser: http://localhost:8084/h2-console");
            System.out.println("   2. 🔗 Use JDBC URL: jdbc:h2:mem:branddb");
            System.out.println("   3. 📊 Check 'brands' table: SELECT * FROM brands");
            System.out.println("   4. 🔄 Test APIs using curl commands above");
            System.out.println("   5. ✅ Verify both brands and shops work in same table");
            System.out.println();
            System.out.println("💡 SPECIAL FEATURES:");
            System.out.println("   - Combined Entity: Brands and Shops in one table");
            System.out.println("   - Brand Type: BRAND (global) or SHOP (local)");
            System.out.println("   - Smart Fields: Logo/website for brands, address/hours for shops");
            System.out.println("   - Rating System: Supports ratings and verification");
            System.out.println("   - Full Address: Automatic full address formatting");
            System.out.println();
            System.out.println("================================================================================");
            System.out.println("✨ Brand Service (Brands + Shops) is ready for testing! ✨");
            System.out.println("================================================================================");
        };
    }
}