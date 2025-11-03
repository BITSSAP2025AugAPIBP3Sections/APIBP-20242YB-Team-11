#!/bin/bash

# Stop all OfferZone Backend Services

echo "🛑 Stopping all OfferZone services..."

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="logs/$service_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        echo "🔄 Stopping $service_name (PID: $pid)..."
        kill $pid 2>/dev/null
        rm "$pid_file"
        echo "✅ $service_name stopped"
    else
        echo "⚠️  $service_name PID file not found"
    fi
}

# Stop all services
stop_service "consumer-service"
stop_service "retailer-service"
stop_service "product-service"
stop_service "brand-service"
stop_service "interaction-service"

echo ""
echo "✅ All services stopped!"