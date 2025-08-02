from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import uvicorn
from pydantic import BaseModel
import random
import json

app = FastAPI(
    title="Crime Analytics API",
    description="RESTful API for Indian Crime Data Analytics Platform",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class CrimeRecord(BaseModel):
    id: str
    crime_type: str
    state: str
    city: str
    district: str
    date: str
    latitude: float
    longitude: float
    severity: str
    victim_age: Optional[int] = None
    victim_gender: Optional[str] = None
    status: str

class CrimeStats(BaseModel):
    total_crimes: int
    resolved_crimes: int
    pending_crimes: int
    high_severity_crimes: int
    states_affected: int
    crime_types: int

# Sample data generation
def generate_sample_data():
    """Generate sample Indian crime data for demonstration"""
    states = [
        'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Karnataka',
        'Tamil Nadu', 'West Bengal', 'Andhra Pradesh', 'Madhya Pradesh', 'Telangana'
    ]
    
    cities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur'
    ]
    
    crime_types = [
        'Theft', 'Burglary', 'Assault', 'Fraud', 'Vehicle Theft',
        'Domestic Violence', 'Robbery', 'Cybercrime', 'Drug Offense', 'Murder'
    ]
    
    city_coordinates = {
        'Mumbai': [19.0760, 72.8777],
        'Delhi': [28.7041, 77.1025],
        'Bangalore': [12.9716, 77.5946],
        'Chennai': [13.0827, 80.2707],
        'Kolkata': [22.5726, 88.3639],
        'Hyderabad': [17.3850, 78.4867],
        'Pune': [18.5204, 73.8567],
        'Ahmedabad': [23.0225, 72.5714],
        'Surat': [21.1702, 72.8311],
        'Jaipur': [26.9124, 75.7873]
    }
    
    data = []
    base_date = datetime.now()
    
    for i in range(2000):
        city = random.choice(cities)
        state = random.choice(states)
        crime_type = random.choice(crime_types)
        severity = random.choice(['low', 'medium', 'high'])
        status = random.choice(['pending', 'resolved', 'closed'])
        gender = random.choice(['male', 'female'])
        
        # Random date within last 2 years
        random_days = random.randint(0, 730)
        crime_date = base_date - timedelta(days=random_days)
        
        # Get coordinates with some randomness
        base_coords = city_coordinates.get(city, [20.5937, 78.9629])
        latitude = base_coords[0] + random.uniform(-0.5, 0.5)
        longitude = base_coords[1] + random.uniform(-0.5, 0.5)
        
        record = {
            'id': f'crime_{i+1}',
            'crime_type': crime_type,
            'state': state,
            'city': city,
            'district': f'{city} District',
            'date': crime_date.isoformat(),
            'latitude': latitude,
            'longitude': longitude,
            'severity': severity,
            'victim_age': random.randint(18, 75),
            'victim_gender': gender,
            'status': status
        }
        data.append(record)
    
    return data

# In-memory data store (in production, use a real database)
crime_data = generate_sample_data()

@app.get("/")
async def root():
    return {"message": "Crime Analytics API", "version": "1.0.0", "status": "active"}

@app.get("/api/crimes", response_model=List[dict])
async def get_crimes(
    state: Optional[str] = Query(None, description="Filter by state"),
    city: Optional[str] = Query(None, description="Filter by city"),
    crime_type: Optional[str] = Query(None, description="Filter by crime type"),
    year: Optional[int] = Query(None, description="Filter by year"),
    severity: Optional[str] = Query(None, description="Filter by severity"),
    limit: int = Query(100, description="Limit number of results")
):
    """Get crime data with optional filters"""
    try:
        filtered_data = crime_data.copy()
        
        if state:
            filtered_data = [d for d in filtered_data if state.lower() in d['state'].lower()]
        
        if city:
            filtered_data = [d for d in filtered_data if city.lower() in d['city'].lower()]
        
        if crime_type:
            filtered_data = [d for d in filtered_data if crime_type.lower() in d['crime_type'].lower()]
        
        if year:
            filtered_data = [d for d in filtered_data if datetime.fromisoformat(d['date']).year == year]
        
        if severity:
            filtered_data = [d for d in filtered_data if d['severity'] == severity]
        
        return filtered_data[:limit]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching crime data: {str(e)}")

@app.get("/api/stats", response_model=CrimeStats)
async def get_crime_stats():
    """Get overall crime statistics"""
    try:
        total_crimes = len(crime_data)
        resolved_crimes = len([d for d in crime_data if d['status'] == 'resolved'])
        pending_crimes = len([d for d in crime_data if d['status'] == 'pending'])
        high_severity_crimes = len([d for d in crime_data if d['severity'] == 'high'])
        states_affected = len(set(d['state'] for d in crime_data))
        crime_types = len(set(d['crime_type'] for d in crime_data))
        
        return CrimeStats(
            total_crimes=total_crimes,
            resolved_crimes=resolved_crimes,
            pending_crimes=pending_crimes,
            high_severity_crimes=high_severity_crimes,
            states_affected=states_affected,
            crime_types=crime_types
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching statistics: {str(e)}")

@app.get("/api/heatmap")
async def get_heatmap_data():
    """Get geographical heatmap data"""
    try:
        heatmap_data = []
        
        # Group by state and count crimes
        state_crimes = {}
        for record in crime_data:
            state = record['state']
            if state not in state_crimes:
                state_crimes[state] = {
                    'count': 0,
                    'coordinates': []
                }
            state_crimes[state]['count'] += 1
            state_crimes[state]['coordinates'].append([record['latitude'], record['longitude']])
        
        # Calculate average coordinates for each state
        for state, data in state_crimes.items():
            coords = data['coordinates']
            avg_lat = sum(coord[0] for coord in coords) / len(coords)
            avg_lng = sum(coord[1] for coord in coords) / len(coords)
            
            heatmap_data.append({
                'state': state,
                'crime_count': data['count'],
                'latitude': avg_lat,
                'longitude': avg_lng
            })
        
        return heatmap_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating heatmap data: {str(e)}")

@app.get("/api/trends")
async def get_crime_trends(
    location: Optional[str] = Query(None, description="Location (state or city)"),
    crime_type: Optional[str] = Query(None, description="Crime type")
):
    """Get crime trends over time"""
    try:
        filtered_data = crime_data.copy()
        
        if location:
            filtered_data = [d for d in filtered_data 
                           if location.lower() in d['state'].lower() or location.lower() in d['city'].lower()]
        
        if crime_type:
            filtered_data = [d for d in filtered_data if crime_type.lower() in d['crime_type'].lower()]
        
        # Group by month
        monthly_trends = {}
        for record in filtered_data:
            date_obj = datetime.fromisoformat(record['date'])
            month_key = date_obj.strftime('%Y-%m')
            
            if month_key not in monthly_trends:
                monthly_trends[month_key] = 0
            monthly_trends[month_key] += 1
        
        # Convert to list format
        trends = [{'month': month, 'count': count} for month, count in sorted(monthly_trends.items())]
        
        return trends
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating trends: {str(e)}")

@app.get("/api/predict")
async def predict_crime_trends(
    location: str = Query(..., description="Location for prediction"),
    crime_type: str = Query(..., description="Crime type for prediction")
):
    """Predict future crime trends (simplified ML model)"""
    try:
        # This is a simplified prediction model
        # In production, you would use actual ML models like Prophet, ARIMA, etc.
        
        # Filter historical data
        filtered_data = [d for d in crime_data 
                        if location.lower() in d['state'].lower() or location.lower() in d['city'].lower()]
        filtered_data = [d for d in filtered_data if crime_type.lower() in d['crime_type'].lower()]
        
        if not filtered_data:
            return {"error": "No historical data found for the specified location and crime type"}
        
        # Simple trend calculation
        monthly_counts = {}
        for record in filtered_data:
            date_obj = datetime.fromisoformat(record['date'])
            month_key = date_obj.strftime('%Y-%m')
            monthly_counts[month_key] = monthly_counts.get(month_key, 0) + 1
        
        if len(monthly_counts) < 3:
            return {"error": "Insufficient data for prediction"}
        
        # Calculate average and trend
        counts = list(monthly_counts.values())
        avg_count = sum(counts) / len(counts)
        recent_avg = sum(counts[-3:]) / 3  # Last 3 months average
        
        # Simple linear trend
        trend = (recent_avg - avg_count) / avg_count if avg_count > 0 else 0
        
        # Generate predictions for next 6 months
        predictions = []
        base_date = datetime.now()
        
        for i in range(1, 7):
            future_date = base_date + timedelta(days=30*i)
            predicted_count = max(0, int(recent_avg * (1 + trend * i * 0.1)))
            
            predictions.append({
                'month': future_date.strftime('%Y-%m'),
                'predicted_count': predicted_count,
                'confidence': max(0.6, 0.9 - i * 0.05)  # Decreasing confidence
            })
        
        return {
            'location': location,
            'crime_type': crime_type,
            'historical_average': round(avg_count, 2),
            'recent_trend': round(trend * 100, 2),  # Percentage
            'predictions': predictions
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating predictions: {str(e)}")

@app.post("/api/upload")
async def upload_crime_data(records: List[CrimeRecord]):
    """Upload new crime data (admin only in production)"""
    try:
        # In production, add authentication and authorization
        new_records = []
        for record in records:
            new_record = record.dict()
            new_records.append(new_record)
        
        crime_data.extend(new_records)
        
        return {
            "message": f"Successfully uploaded {len(new_records)} crime records",
            "total_records": len(crime_data)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading data: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)