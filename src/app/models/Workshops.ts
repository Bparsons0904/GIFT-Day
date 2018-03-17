export interface Workshop {
    id?: string;
    name: string;
    presenter: string;
    description: string;
    room: string;
    totalSeats: number;
    availableSeats: number;
    imageURL?: string;
}