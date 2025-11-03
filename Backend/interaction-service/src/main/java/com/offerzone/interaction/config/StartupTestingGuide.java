package com.offerzone.interaction.config;

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
        System.out.println("🚀 INTERACTION SERVICE SUCCESSFULLY STARTED! 🚀");
        System.out.println("=".repeat(80));
        System.out.println();
        
        System.out.println("📋 SERVICE INFORMATION:");
        System.out.println("   Service: INTERACTION-SERVICE");
        System.out.println("   Port: 8085");
        System.out.println("   Database: interactiondb");
        System.out.println("   Base URL: http://localhost:8085");
        System.out.println("   H2 Console: http://localhost:8085/h2-console");
        System.out.println();

        System.out.println("🔐 H2 DATABASE CONNECTION DETAILS:");
        System.out.println("   JDBC URL: jdbc:h2:mem:interactiondb");
        System.out.println("   Username: sa");
        System.out.println("   Password: (leave empty)");
        System.out.println("   Driver: org.h2.Driver");
        System.out.println();

        System.out.println("🛠️  REST API ENDPOINTS:");
        System.out.println("   GET    http://localhost:8085/api/interactions       - Get all interactions");
        System.out.println("   GET    http://localhost:8085/api/interactions/{id}  - Get interaction by ID");
        System.out.println("   POST   http://localhost:8085/api/interactions       - Create new interaction");
        System.out.println("   PUT    http://localhost:8085/api/interactions/{id}  - Update interaction");
        System.out.println("   DELETE http://localhost:8085/api/interactions/{id}  - Delete interaction");
        System.out.println();

        System.out.println("📝 SAMPLE JSON FOR POST/PUT:");
        System.out.println("   {");
        System.out.println("       \"consumerId\": 1,");
        System.out.println("       \"offerId\": 1,");
        System.out.println("       \"type\": \"VIEW\",");
        System.out.println("       \"sessionId\": \"session123\",");
        System.out.println("       \"ipAddress\": \"192.168.1.1\",");
        System.out.println("       \"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)\",");
        System.out.println("       \"metadata\": \"additional tracking data\"");
        System.out.println("   }");
        System.out.println();

        System.out.println("🔧 QUICK CURL TESTING COMMANDS:");
        System.out.println("   # Get all interactions");
        System.out.println("   curl -X GET http://localhost:8085/api/interactions");
        System.out.println();
        System.out.println("   # Create a new interaction");
        System.out.println("   curl -X POST http://localhost:8085/api/interactions \\");
        System.out.println("        -H \"Content-Type: application/json\" \\");
        System.out.println("        -d '{\"consumerId\":1,\"offerId\":1,\"type\":\"VIEW\"}'");
        System.out.println();

        System.out.println("🧪 TESTING STEPS:");
        System.out.println("   1. 🌐 Open browser: http://localhost:8085/h2-console");
        System.out.println("   2. 🔗 Use JDBC URL: jdbc:h2:mem:interactiondb");
        System.out.println("   3. 📊 Check 'interactions' table: SELECT * FROM interactions");
        System.out.println("   4. 🔄 Test APIs using curl commands above");
        System.out.println("   5. ✅ Verify data persists in H2 console");
        System.out.println();

        System.out.println("📊 ANALYTICS FEATURES:");
        System.out.println("   • Interaction Types: VIEW, SAVE, REDEEM, CLICK, SEARCH, FILTER");
        System.out.println("   • Session Tracking: User sessions and behavior patterns");
        System.out.println("   • Device Information: IP addresses and user agents");
        System.out.println("   • Timestamp Tracking: Precise interaction timing");
        System.out.println("   • Metadata Storage: Flexible additional tracking data");
        System.out.println();

        System.out.println("=".repeat(80));
        System.out.println("✨ Service is ready for testing! ✨");
        System.out.println("=".repeat(80));
        System.out.println();
    }
}