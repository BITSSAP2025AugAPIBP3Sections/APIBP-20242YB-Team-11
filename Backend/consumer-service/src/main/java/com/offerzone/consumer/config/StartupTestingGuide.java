

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
        System.out.println("🚀 CONSUMER SERVICE SUCCESSFULLY STARTED! 🚀");
        System.out.println("=".repeat(80));
        System.out.println();
        
        System.out.println("📋 SERVICE INFORMATION:");
        System.out.println("   Service: CONSUMER-SERVICE");
        System.out.println("   Port: 8081");
        System.out.println("   Database: consumerdb");
        System.out.println("   Base URL: http://localhost:8081");
        System.out.println("   H2 Console: http://localhost:8081/h2-console");
        System.out.println();

        System.out.println("🔐 H2 DATABASE CONNECTION DETAILS:");
        System.out.println("   JDBC URL: jdbc:h2:mem:consumerdb");
        System.out.println("   Username: sa");
        System.out.println("   Password: (leave empty)");
        System.out.println("   Driver: org.h2.Driver");
        System.out.println();

        System.out.println("🛠️  REST API ENDPOINTS:");
        System.out.println("   GET    http://localhost:8081/api/consumers          - Get all consumers");
        System.out.println("   GET    http://localhost:8081/api/consumers/{id}     - Get consumer by ID");
        System.out.println("   POST   http://localhost:8081/api/consumers          - Create new consumer");
        System.out.println("   PUT    http://localhost:8081/api/consumers/{id}     - Update consumer");
        System.out.println("   DELETE http://localhost:8081/api/consumers/{id}     - Delete consumer");
        System.out.println();

        System.out.println("📝 SAMPLE JSON FOR POST/PUT:");
        System.out.println("   {");
        System.out.println("       \"name\": \"John Doe\",");
        System.out.println("       \"email\": \"john@example.com\",");
        System.out.println("       \"phone\": \"1234567890\",");
        System.out.println("       \"address\": \"123 Main St\",");
        System.out.println("       \"city\": \"New York\",");
        System.out.println("       \"state\": \"NY\",");
        System.out.println("       \"zipCode\": \"10001\",");
        System.out.println("       \"dateOfBirth\": \"1990-01-15\",");
        System.out.println("       \"gender\": \"MALE\",");
        System.out.println("       \"status\": \"ACTIVE\"");
        System.out.println("   }");
        System.out.println();

        System.out.println("🔧 QUICK CURL TESTING COMMANDS:");
        System.out.println("   # Get all consumers");
        System.out.println("   curl -X GET http://localhost:8081/api/consumers");
        System.out.println();
        System.out.println("   # Create a new consumer");
        System.out.println("   curl -X POST http://localhost:8081/api/consumers \\");
        System.out.println("        -H \"Content-Type: application/json\" \\");
        System.out.println("        -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"1234567890\"}'");
        System.out.println();

        System.out.println("🧪 TESTING STEPS:");
        System.out.println("   1. 🌐 Open browser: http://localhost:8081/h2-console");
        System.out.println("   2. 🔗 Use JDBC URL: jdbc:h2:mem:consumerdb");
        System.out.println("   3. 📊 Check 'consumers' table: SELECT * FROM consumers");
        System.out.println("   4. 🔄 Test APIs using curl commands above");
        System.out.println("   5. ✅ Verify data persists in H2 console");
        System.out.println();

        System.out.println("=".repeat(80));
        System.out.println("✨ Service is ready for testing! ✨");
        System.out.println("=".repeat(80));
        System.out.println();
    }
}