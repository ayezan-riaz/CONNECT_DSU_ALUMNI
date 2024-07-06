// Define the common Event type
export interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    event_images: string | File[]; // Union type to handle both URL string and File array
}
