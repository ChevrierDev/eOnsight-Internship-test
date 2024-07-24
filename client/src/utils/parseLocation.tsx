import { GeoLocation } from "../types/index";

// Function to parse a location string in the format(longitude latitude)
export function parseLocation(location: string): GeoLocation {
    const match = location.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
    if (match) {
        return {
            longitude: parseFloat(match[1]), 
            latitude: parseFloat(match[2]),  
        };
    }
    return { latitude: 0, longitude: 0 }; 
}
