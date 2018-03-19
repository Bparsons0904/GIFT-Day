export interface Workshop {
    id?: string;
    name: string;
    presenter: {
        id: string;
        name: string;
    };
    description: string;
    room: string;
    totalSeats: number;
    availableSeats?: number;
    imageURL?: string;
}