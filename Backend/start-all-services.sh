#!/bin/bash

# OfferZone Backend Services Startup Script
# Updated for simplified 5-service architecture

echo "=============================================================="
echo "🚀 OFFERZONE SIMPLIFIED MICROSERVICE ARCHITECTURE 🚀"
echo "=============================================================="
echo ""
echo "📋 Starting 5 Core Services:"
echo "   1. Consumer Service    (Port 8081) - End users"
echo "   2. Retailer Service    (Port 8082) - Business owners"
echo "   3. Product Service     (Port 8083) - Products with offers"
echo "   4. Brand Service       (Port 8084) - Brands & Shops"
echo "   5. Interaction Service (Port 8085) - User interactions"
echo ""
echo "=============================================================="

# Function to start a service in background
start_service() {
    local service_name=$1
    local port=$2
    
    echo "🔄 Starting $service_name on port $port..."
    cd "$service_name"
    
    # Start the service in background
    mvn spring-boot:run > "../logs/$service_name.log" 2>&1 &
    
    # Store the PID
    echo $! > "../logs/$service_name.pid"
    
    echo "✅ $service_name started (PID: $(cat ../logs/$service_name.pid))"
    cd ..
}

# Create logs directory
mkdir -p logs

echo "🔄 Starting all services..."
echo ""

# Start all services
start_service "consumer-service" "8081"
start_service "retailer-service" "8082"
start_service "product-service" "8083"
start_service "brand-service" "8084"
start_service "interaction-service" "8085"

echo ""
echo "⏳ Waiting for services to start up..."
sleep 30

echo ""
echo "=============================================================="
echo "✅ ALL SERVICES STARTED!"
echo "=============================================================="
echo ""
echo "🌐 Service URLs:"
echo "   Consumer:    http://localhost:8081"
echo "   Retailer:    http://localhost:8082"
echo "   Product:     http://localhost:8083"
echo "   Brand:       http://localhost:8084"
echo "   Interaction: http://localhost:8085"
echo ""
echo "🗄️  H2 Database Consoles:"
echo "   Consumer:    http://localhost:8081/h2-console (jdbc:h2:mem:consumerdb)"
echo "   Retailer:    http://localhost:8082/h2-console (jdbc:h2:mem:retailerdb)"
echo "   Product:     http://localhost:8083/h2-console (jdbc:h2:mem:productdb)"
echo "   Brand:       http://localhost:8084/h2-console (jdbc:h2:mem:branddb)"
echo "   Interaction: http://localhost:8085/h2-console (jdbc:h2:mem:interactiondb)"
echo ""
echo "📊 Check logs: tail -f logs/[service-name].log"
echo "🛑 Stop all: ./stop-services.sh"
echo ""
echo "=============================================================="