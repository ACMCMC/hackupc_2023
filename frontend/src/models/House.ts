// This model represents a House in the database. It contains the following fields:
// - id: the id of the house
// - name: the name of the house
// - address: the address of the house
// - description: the description of the house
// - price: the price of the house
// - image: the image of the house

export interface House {
    id: number;
    name: string;
    address: string;
    description: string;
    price: number;
    image: string;
    rooms_and_appliances: Map<string, string[]>;
}