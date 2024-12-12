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
}