#!/usr/bin/env python3
"""
Crime Analytics API Server
Run this script to start the FastAPI development server
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("🚀 Starting Crime Analytics API Server...")
    print("📊 API Documentation: http://localhost:8000/docs")
    print("🗺️  Interactive API Explorer: http://localhost:8000/redoc")
    print("🔄 Hot reload enabled for development")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )