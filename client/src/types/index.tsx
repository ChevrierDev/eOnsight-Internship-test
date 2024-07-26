//define types for Bridges object
export interface Bridges {
  readonly id: number;
  name: string;
  location: string;
  inspection_date: string;
  status: Status;
  traffic_load: number;
}

//define types for geo-spatial locations
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

//define Alias for status only allowed strings : "Good" | "Fair" | "Poor" | "Bad"
export type Status = "Good" | "Fair" | "Poor" | "Bad";

//define type of API response
export interface BridgeResponse {
  count: number;
  results: Bridges[];
}

// pie charts type 
export interface PieChartProps {
  data: {
    Good: number;
    Fair: number;
    Poor: number;
    Bad: number;
  };
}

// filter params type
export interface FilterParams {
  inspection_date?: string;
  name?: string;
  status?: 'Good' | 'Fair' | 'Bad' | 'Poor';
  traffic_load_min?: number | '';
  traffic_load_max?: number | '';
}
