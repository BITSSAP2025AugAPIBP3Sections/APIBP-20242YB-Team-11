package com.offerzone.retailer.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupTestingGuide implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        displayTestingGuide();
    }

    private void displayTestingGuide() {
        System.out.println("\n" + "=".repeat(80));
        System.out.println("🚀 RETAILER SERVICE SUCCESSFULLY STARTED! 🚀");
        System.out.println("=".repeat(80));
        System.out.println();
        
        System.out.println("📋 SERVICE INFORMATION:");
        System.out.println("   Service: RETAILER-SERVICE");
        System.out.println("   Port: 8082");
        System.out.println("   Database: retailerdb");
        System.out.println("   Base URL: http://localhost:8082");
        System.out.println("   H2 Console: http://localhost:8082/h2-console");
        System.out.println();

        System.out.println("🔐 H2 DATABASE CONNECTION DETAILS:");
        System.out.println("   JDBC URL: jdbc:h2:mem:retailerdb");
        System.out.println("   Username: sa");
        System.out.println("   Password: (leave empty)");
        System.out.println("   Driver: org.h2.Driver");
        System.out.println();

        System.out.println("🛠️  REST API ENDPOINTS:");
        System.out.println("   GET    http://localhost:8082/api/retailers          - Get all retailers");
        System.out.println("   GET    http://localhost:8082/api/retailers/{id}     - Get retailer by ID");
        System.out.println("   POST   http://localhost:8082/api/retailers          - Create new retailer");
        System.out.println("   PUT    http://localhost:8082/api/retailers/{id}     - Update retailer");
        System.out.println("   DELETE http://localhost:8082/api/retailers/{id}     - Delete retailer");
        System.out.println();

        System.out.println("📝 SAMPLE JSON FOR POST/PUT:");
        System.out.println("   {");
        System.out.println("       \"businessName\": \"ABC Store\",");
        System.out.println("       \"ownerName\": \"Jane Smith\",");
        System.out.println("       \"email\": \"abc@store.com\",");
        System.out.println("       \"phone\": \"9876543210\",");
        System.out.println("       \"address\": \"456 Business Ave\",");
        System.out.println("       \"city\": \"Los Angeles\",");
        System.out.println("       \"state\": \"CA\",");
        System.out.println("       \"zipCode\": \"90001\",");
        System.out.println("       \"businessType\": \"RETAIL\",");
        System.out.println("       \"subscriptionPlan\": \"BASIC\",");
        System.out.println("       \"status\": \"ACTIVE\"");
        System.out.println("   }");
        System.out.println();

        System.out.println("🔧 QUICK CURL TESTING COMMANDS:");
        System.out.println("   # Get all retailers");
        System.out.println("   curl -X GET http://localhost:8082/api/retailers");
        System.out.println();
        System.out.println("   # Create a new retailer");
        System.out.println("   curl -X POST http://localhost:8082/api/retailers \\");
        System.out.println("        -H \"Content-Type: application/json\" \\");
        System.out.println("        -d '{\"businessName\":\"ABC Store\",\"email\":\"abc@store.com\",\"ownerName\":\"Jane Smith\"}'");
        System.out.println();

        System.out.println("🧪 TESTING STEPS:");
        System.out.println("   1. 🌐 Open browser: http://localhost:8082/h2-console");
        System.out.println("   2. 🔗 Use JDBC URL: jdbc:h2:mem:retailerdb");
        System.out.println("   3. 📊 Check 'retailers' table: SELECT * FROM retailers");
        System.out.println("   4. 🔄 Test APIs using curl commands above");
        System.out.println("   5. ✅ Verify data persists in H2 console");
        System.out.println();

        System.out.println("💼 BUSINESS FEATURES:");
        System.out.println("   • Subscription Plans: FREE, BASIC, PREMIUM, ENTERPRISE");
        System.out.println("   • Status Management: PENDING, ACTIVE, INACTIVE, SUSPENDED, DELETED");
        System.out.println("   • Business Type Tracking: RETAIL, RESTAURANT, SERVICE, etc.");
        System.out.println();

        System.out.println("=".repeat(80));
        System.out.println("✨ Service is ready for testing! ✨");
        System.out.println("=".repeat(80));
        System.out.println();
    }
}