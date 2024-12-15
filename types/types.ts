export interface Brand {
    name: string;
    id: number;
    country: string;
    founded: number;
    city: {
        name: string;
        latitude: number;
        longitude: number;
    };
    website: string;
    logo: string;
}


export interface CarModel {
    id: number;
    name: string;
    brand_id: number;
    type: string;
    year: number;
    fuel_type: string;
    top_speed_kmh: number;
    acceleration_0_to_100_kmh: number;
    horsepower: number;
    transmission: string;
    seating_capacity: number;
}