#!/bin/bash

# OfferZone Backend Services Startup Script
echo "🚀 Starting OfferZone Backend Services..."

echo "📁 Building all services..."

# Build Consumer Service
echo "🔨 Building Consumer Service..."
cd consumer-service && mvn clean install -q && cd ..

# Build Retailer Service  
echo "🔨 Building Retailer Service..."
cd retailer-service && mvn clean install -q && cd ..

# Build Category Service
echo "🔨 Building Category Service..."  
cd category-service && mvn clean install -q && cd ..

# Build Offer Service
echo "🔨 Building Offer Service..."
cd offer-service && mvn clean install -q && cd ..

# Build Interaction Service
echo "🔨 Building Interaction Service..."
cd interaction-service && mvn clean install -q && cd ..

echo "✅ All services built successfully!"
echo ""
echo "🎯 Services will be available at:"
echo "👥 Consumer Service:    http://localhost:8081"
echo "🏪 Retailer Service:    http://localhost:8082" 
echo "📂 Category Service:    http://localhost:8083"
echo "🎯 Offer Service:       http://localhost:8084"
echo "📊 Interaction Service: http://localhost:8085"
echo ""
echo "💾 Database Consoles:"
echo "👥 Consumer DB:    http://localhost:8081/h2-console"
echo "🏪 Retailer DB:    http://localhost:8082/h2-console"
echo "📂 Category DB:    http://localhost:8083/h2-console"
echo "🎯 Offer DB:       http://localhost:8084/h2-console"
echo "📊 Interaction DB: http://localhost:8085/h2-console"
echo ""
echo "🔑 Database Connection:"
echo "   JDBC URL: jdbc:h2:mem:[servicename]db"
echo "   Username: sa"
echo "   Password: (leave empty)"
echo ""
echo "ℹ️  Consumer Service is already running on port 8081"
echo "To start other services individually, run:"
echo "   cd [service-name] && mvn spring-boot:run"