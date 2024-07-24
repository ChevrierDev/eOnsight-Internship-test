//define types for Bridges object
export interface Bridges {
    readonly id: number;
    name: string;
    location: string;
    inspection_date: string;
    status: Status;
    traffic_load: number;
}
  
//Define types for geo-spatial locations
export interface GeoLocation {
    latitude: number;
    longitude: number;
}

//Define Alias for status only allowed strings : "Good" | "Fair" | "Poor" | "Bad"
export type Status = "Good" | "Fair" | "Poor" | "Bad"

//Define type of API response
export interface BridgeResponse {
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
  
