export interface CrimeData {
  id: string;
  crimeType: string;
  state: string;
  city: string;
  district: string;
  date: Date;
  latitude: number;
  longitude: number;
  severity: 'low' | 'medium' | 'high';
  victimAge?: number;
  victimGender?: 'male' | 'female';
  status: 'pending' | 'resolved' | 'closed';
}

export interface FilterState {
  state: string;
  city: string;
  year: string;
  crimeType: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface MapData {
  state: string;
  crimeCount: number;
  coordinates: [number, number];
}