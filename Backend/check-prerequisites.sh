#!/bin/bash

# OfferZone Backend - Prerequisites Checker
echo "🔧 OfferZone Backend Prerequisites Checker"
echo "=========================================="
echo ""

# Check Java
echo -n "☕ Java: "
if command -v java &> /dev/null; then
    java_version=$(java -version 2>&1 | head -n 1)
    echo "✅ Found - $java_version"
else
    echo "❌ Not Found - Please install Java 17+"
fi

# Check Maven
echo -n "📦 Maven: "
if command -v mvn &> /dev/null; then
    mvn_version=$(mvn -version 2>&1 | head -n 1)
    echo "✅ Found - $mvn_version"
else
    echo "❌ Not Found - Please install Maven 3.6+"
fi

# Check Git
echo -n "🔗 Git: "
if command -v git &> /dev/null; then
    git_version=$(git --version 2>&1)
    echo "✅ Found - $git_version"
else
    echo "❌ Not Found - Please install Git"
fi

# Check Curl (for testing)
echo -n "🌐 Curl: "
if command -v curl &> /dev/null; then
    curl_version=$(curl --version 2>&1 | head -n 1)
    echo "✅ Found - $curl_version"
else
    echo "❌ Not Found - Please install Curl (for API testing)"
fi

# Check available ports
echo ""
echo "🔍 Checking Ports (8081-8085):"
for port in 8081 8082 8083 8084 8085; do
    if lsof -i :$port &> /dev/null; then
        echo "   Port $port: ❌ In Use (needs to be freed)"
    else
        echo "   Port $port: ✅ Available"
    fi
done

echo ""
echo "📋 Prerequisites Summary:"
java_ok=$(command -v java &> /dev/null && echo "✅" || echo "❌")
maven_ok=$(command -v mvn &> /dev/null && echo "✅" || echo "❌")
git_ok=$(command -v git &> /dev/null && echo "✅" || echo "❌")

echo "   Java 17+: $java_ok"
echo "   Maven 3.6+: $maven_ok"  
echo "   Git: $git_ok"

if [[ $java_ok == "✅" && $maven_ok == "✅" && $git_ok == "✅" ]]; then
    echo ""
    echo "🎉 All prerequisites are installed! You're ready to start OfferZone Backend."
    echo "📖 Next step: See SETUP_GUIDE.md for complete setup instructions."
else
    echo ""
    echo "⚠️  Some prerequisites are missing. Please install them before proceeding."
    echo "📖 See SETUP_GUIDE.md for installation links and instructions."
fi

echo ""