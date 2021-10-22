export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
}

export interface Stock {
    id: number;
    amount: number;
}

export interface FoodType {
    id: number;
    name: string;
    price: string;
    image: string;
    available: boolean;
    description: string;
}