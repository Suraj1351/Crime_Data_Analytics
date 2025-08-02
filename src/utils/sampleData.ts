import { CrimeData } from '../types';

const indianStates = [
  'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Karnataka',
  'Tamil Nadu', 'West Bengal', 'Andhra Pradesh', 'Madhya Pradesh', 'Telangana',
  'Bihar', 'Odisha', 'Punjab', 'Haryana', 'Kerala'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'
];

const crimeTypes = [
  'Theft', 'Burglary', 'Assault', 'Fraud', 'Vehicle Theft',
  'Domestic Violence', 'Robbery', 'Cybercrime', 'Drug Offense', 'Murder'
];

const severityLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
const statusOptions: ('pending' | 'resolved' | 'closed')[] = ['pending', 'resolved', 'closed'];
const genderOptions: ('male' | 'female')[] = ['male', 'female'];

// Coordinates for major Indian cities (approximate)
const cityCoordinates: Record<string, [number, number]> = {
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Bangalore': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Hyderabad': [17.3850, 78.4867],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Surat': [21.1702, 72.8311],
  'Jaipur': [26.9124, 75.7873],
  'Lucknow': [26.8467, 80.9462],
  'Kanpur': [26.4499, 80.3319],
  'Nagpur': [21.1458, 79.0882],
  'Indore': [22.7196, 75.8577],
  'Thane': [19.2183, 72.9781]
};

export const generateSampleData = (): CrimeData[] => {
  const data: CrimeData[] = [];
  const currentDate = new Date();
  
  for (let i = 0; i < 2000; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = indianStates[Math.floor(Math.random() * indianStates.length)];
    const crimeType = crimeTypes[Math.floor(Math.random() * crimeTypes.length)];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const gender = genderOptions[Math.floor(Math.random() * genderOptions.length)];
    
    // Generate random date within last 2 years
    const randomDate = new Date(currentDate.getTime() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000);
    
    // Get coordinates for the city, with some random variation
    const baseCoords = cityCoordinates[city] || [20.5937, 78.9629]; // Default to center of India
    const latitude = baseCoords[0] + (Math.random() - 0.5) * 0.5; // Add some randomness
    const longitude = baseCoords[1] + (Math.random() - 0.5) * 0.5;
    
    data.push({
      id: `crime_${i + 1}`,
      crimeType,
      state,
      city,
      district: `${city} District`,
      date: randomDate,
      latitude,
      longitude,
      severity,
      victimAge: Math.floor(Math.random() * 60) + 18,
      victimGender: gender,
      status
    });
  }
  
  return data.sort((a, b) => b.date.getTime() - a.date.getTime());
};