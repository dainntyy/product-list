export interface Product {
    id: number;
    image: { desktop: string };
    name: string;
    category: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
}
