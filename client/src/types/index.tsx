//define types for Bridges object
export interface Bridges {
    readonly id: number;
    name: string;
    location: GeoLocation;
    inspection_date: Date;
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
