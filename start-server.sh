#!/bin/bash

# George Orphanides Portfolio - Local Server Starter
# This script starts a simple local web server to view the portfolio

echo "🎵 Starting George Orphanides Portfolio..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null
then
    echo "✅ Using Python 3 to start server"
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null
then
    echo "✅ Using Python to start server"
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
# Check if PHP is available
elif command -v php &> /dev/null
then
    echo "✅ Using PHP to start server"
    echo "📂 Server running at: http://localhost:8000"
    echo "🌐 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
else
    echo "❌ Error: No suitable server found"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3 (recommended)"
    echo "  - Python 2"
    echo "  - PHP"
    echo ""
    echo "Or use Node.js:"
    echo "  npx http-server"
fi
