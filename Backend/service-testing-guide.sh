#!/bin/bash

# OfferZone Backend Services Testing Guide
# This script provides comprehensive testing instructions for each microservice

echo "=============================================================="
echo "🚀 OFFERZONE BACKEND SERVICES TESTING GUIDE 🚀"
echo "=============================================================="
echo ""

show_service_info() {
    local service_name=$1
    local port=$2
    local db_name=$3
    
    echo "📋 SERVICE: $service_name"
    echo "🌐 Port: $port"
    echo "💾 Database: $db_name"
    echo "🔗 Base URL: http://localhost:$port"
    echo "🗄️  H2 Console: http://localhost:$port/h2-console"
    echo ""
    echo "🔐 H2 DATABASE CONNECTION DETAILS:"
    echo "   JDBC URL: jdbc:h2:mem:$db_name"
    echo "   Username: sa"
    echo "   Password: (leave empty)"
    echo "   Driver: org.h2.Driver"
    echo ""
}

show_api_endpoints() {
    local service_name=$1
    local port=$2
    
    echo "🛠️  API ENDPOINTS FOR $service_name:"
    echo ""
    
    case $service_name in
        "CONSUMER-SERVICE")
            echo "   GET    http://localhost:$port/api/consumers          - Get all consumers"
            echo "   GET    http://localhost:$port/api/consumers/{id}     - Get consumer by ID"
            echo "   POST   http://localhost:$port/api/consumers          - Create new consumer"
            echo "   PUT    http://localhost:$port/api/consumers/{id}     - Update consumer"
            echo "   DELETE http://localhost:$port/api/consumers/{id}     - Delete consumer"
            echo ""
            echo "📝 SAMPLE JSON FOR POST/PUT:"
            echo '   {
       "name": "John Doe",
       "email": "john@example.com",
       "phone": "1234567890",
       "address": "123 Main St",
       "city": "New York",
       "state": "NY",
       "zipCode": "10001",
       "dateOfBirth": "1990-01-15",
       "gender": "MALE",
       "status": "ACTIVE"
   }'
            ;;
        "RETAILER-SERVICE")
            echo "   GET    http://localhost:$port/api/retailers          - Get all retailers"
            echo "   GET    http://localhost:$port/api/retailers/{id}     - Get retailer by ID"
            echo "   POST   http://localhost:$port/api/retailers          - Create new retailer"
            echo "   PUT    http://localhost:$port/api/retailers/{id}     - Update retailer"
            echo "   DELETE http://localhost:$port/api/retailers/{id}     - Delete retailer"
            echo ""
            echo "📝 SAMPLE JSON FOR POST/PUT:"
            echo '   {
       "businessName": "ABC Store",
       "ownerName": "Jane Smith",
       "email": "abc@store.com",
       "phone": "9876543210",
       "address": "456 Business Ave",
       "city": "Los Angeles",
       "state": "CA",
       "zipCode": "90001",
       "businessType": "RETAIL",
       "subscriptionPlan": "BASIC",
       "status": "ACTIVE"
   }'
            ;;
        "CATEGORY-SERVICE")
            echo "   GET    http://localhost:$port/api/categories         - Get all categories"
            echo "   GET    http://localhost:$port/api/categories/{id}    - Get category by ID"
            echo "   POST   http://localhost:$port/api/categories         - Create new category"
            echo "   PUT    http://localhost:$port/api/categories/{id}    - Update category"
            echo "   DELETE http://localhost:$port/api/categories/{id}    - Delete category"
            echo ""
            echo "📝 SAMPLE JSON FOR POST/PUT:"
            echo '   {
       "name": "Electronics",
       "description": "Electronic gadgets and devices",
       "iconUrl": "https://example.com/electronics-icon.png",
       "colorCode": "#FF5722",
       "sortOrder": 1,
       "status": "ACTIVE"
   }'
            ;;
        "OFFER-SERVICE")
            echo "   GET    http://localhost:$port/api/offers             - Get all offers"
            echo "   GET    http://localhost:$port/api/offers/{id}        - Get offer by ID"
            echo "   POST   http://localhost:$port/api/offers             - Create new offer"
            echo "   PUT    http://localhost:$port/api/offers/{id}        - Update offer"
            echo "   DELETE http://localhost:$port/api/offers/{id}        - Delete offer"
            echo ""
            echo "📝 SAMPLE JSON FOR POST/PUT:"
            echo '   {
       "title": "50% Off Electronics",
       "description": "Amazing discount on all electronics",
       "retailerId": 1,
       "categoryId": 1,
       "originalPrice": 100.00,
       "discountedPrice": 50.00,
       "validFrom": "2024-01-01T00:00:00",
       "validUntil": "2024-12-31T23:59:59",
       "termsAndConditions": "Valid on all items",
       "maxRedemptions": 100,
       "status": "ACTIVE"
   }'
            ;;
        "INTERACTION-SERVICE")
            echo "   GET    http://localhost:$port/api/interactions       - Get all interactions"
            echo "   GET    http://localhost:$port/api/interactions/{id}  - Get interaction by ID"
            echo "   POST   http://localhost:$port/api/interactions       - Create new interaction"
            echo "   PUT    http://localhost:$port/api/interactions/{id}  - Update interaction"
            echo "   DELETE http://localhost:$port/api/interactions/{id}  - Delete interaction"
            echo ""
            echo "📝 SAMPLE JSON FOR POST/PUT:"
            echo '   {
       "consumerId": 1,
       "offerId": 1,
       "type": "VIEW",
       "sessionId": "session123",
       "ipAddress": "192.168.1.1",
       "userAgent": "Mozilla/5.0...",
       "metadata": "additional tracking data"
   }'
            ;;
    esac
    echo ""
}

show_curl_examples() {
    local service_name=$1
    local port=$2
    
    echo "🔧 CURL TESTING EXAMPLES FOR $service_name:"
    echo ""
    
    case $service_name in
        "CONSUMER-SERVICE")
            echo "   # Get all consumers"
            echo "   curl -X GET http://localhost:$port/api/consumers"
            echo ""
            echo "   # Create a new consumer"
            echo "   curl -X POST http://localhost:$port/api/consumers \\"
            echo "        -H \"Content-Type: application/json\" \\"
            echo "        -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"1234567890\"}'"
            ;;
        "RETAILER-SERVICE")
            echo "   # Get all retailers"
            echo "   curl -X GET http://localhost:$port/api/retailers"
            echo ""
            echo "   # Create a new retailer"
            echo "   curl -X POST http://localhost:$port/api/retailers \\"
            echo "        -H \"Content-Type: application/json\" \\"
            echo "        -d '{\"businessName\":\"ABC Store\",\"email\":\"abc@store.com\"}'"
            ;;
        "CATEGORY-SERVICE")
            echo "   # Get all categories"
            echo "   curl -X GET http://localhost:$port/api/categories"
            echo ""
            echo "   # Create a new category"
            echo "   curl -X POST http://localhost:$port/api/categories \\"
            echo "        -H \"Content-Type: application/json\" \\"
            echo "        -d '{\"name\":\"Electronics\",\"description\":\"Electronic items\"}'"
            ;;
        "OFFER-SERVICE")
            echo "   # Get all offers"
            echo "   curl -X GET http://localhost:$port/api/offers"
            echo ""
            echo "   # Create a new offer"
            echo "   curl -X POST http://localhost:$port/api/offers \\"
            echo "        -H \"Content-Type: application/json\" \\"
            echo "        -d '{\"title\":\"50% Off\",\"originalPrice\":100,\"discountedPrice\":50}'"
            ;;
        "INTERACTION-SERVICE")
            echo "   # Get all interactions"
            echo "   curl -X GET http://localhost:$port/api/interactions"
            echo ""
            echo "   # Create a new interaction"
            echo "   curl -X POST http://localhost:$port/api/interactions \\"
            echo "        -H \"Content-Type: application/json\" \\"
            echo "        -d '{\"consumerId\":1,\"offerId\":1,\"type\":\"VIEW\"}'"
            ;;
    esac
    echo ""
}

show_testing_steps() {
    local service_name=$1
    local port=$2
    local db_name=$3
    
    echo "🧪 TESTING STEPS FOR $service_name:"
    echo ""
    echo "1. 🟢 Verify service is running:"
    echo "   - Check terminal shows 'Tomcat started on port(s): $port'"
    echo "   - Look for 'H2 console available at '/h2-console''"
    echo ""
    echo "2. 🌐 Test Base URL:"
    echo "   - Open browser: http://localhost:$port"
    echo "   - Should see Whitelabel Error Page (normal for Spring Boot)"
    echo ""
    echo "3. 🗄️  Connect to H2 Database:"
    echo "   - Open: http://localhost:$port/h2-console"
    echo "   - Use connection details shown above"
    echo "   - Click 'Connect' button"
    echo ""
    echo "4. 📊 Verify Database Schema:"
    echo "   - In H2 console, check tables are created"
    echo "   - Run: SELECT * FROM ${db_name%db} (or similar table name)"
    echo ""
    echo "5. 🔄 Test REST APIs:"
    echo "   - Use curl commands shown above"
    echo "   - Or use Postman/Insomnia with the endpoints"
    echo "   - Start with GET requests, then try POST"
    echo ""
    echo "6. ✅ Validation Checks:"
    echo "   - Try invalid data to test validation"
    echo "   - Check error responses are proper JSON"
    echo "   - Verify data persists in database"
    echo ""
}

# Main function to display complete guide for a service
show_complete_guide() {
    local service_name=$1
    local port=$2
    local db_name=$3
    
    echo "=============================================================="
    show_service_info "$service_name" "$port" "$db_name"
    show_api_endpoints "$service_name" "$port"
    show_curl_examples "$service_name" "$port"
    show_testing_steps "$service_name" "$port" "$db_name"
    echo "=============================================================="
    echo ""
}

# Show guide for specific service or all services
if [ "$1" == "consumer" ]; then
    show_complete_guide "CONSUMER-SERVICE" "8081" "consumerdb"
elif [ "$1" == "retailer" ]; then
    show_complete_guide "RETAILER-SERVICE" "8082" "retailerdb"
elif [ "$1" == "category" ]; then
    show_complete_guide "CATEGORY-SERVICE" "8083" "categorydb"
elif [ "$1" == "offer" ]; then
    show_complete_guide "OFFER-SERVICE" "8084" "offerdb"
elif [ "$1" == "interaction" ]; then
    show_complete_guide "INTERACTION-SERVICE" "8085" "interactiondb"
else
    echo "Usage: ./service-testing-guide.sh [consumer|retailer|category|offer|interaction]"
    echo ""
    echo "Available services:"
    echo "  consumer    - Consumer Service (Port 8081)"
    echo "  retailer    - Retailer Service (Port 8082)"
    echo "  category    - Category Service (Port 8083)"
    echo "  offer       - Offer Service (Port 8084)"
    echo "  interaction - Interaction Service (Port 8085)"
    echo ""
    echo "Example: ./service-testing-guide.sh consumer"
fi