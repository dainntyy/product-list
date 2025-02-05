export interface Product {
    id: number;
    image: {desktop: string} & {mobile: string} & {tablet: string} & {thumbnail: string};
    name: string;
    category: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
}
