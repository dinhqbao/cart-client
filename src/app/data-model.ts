export class Product {
    _id: string;
    name: string;
    price: number = 0;
    ordinal: number = 0;
    image: string;
}

export class CartItem {
    productId: String;
    unitPrice: number;
    quantity: number;
}

export class Table {
    _id: number;
    totalPrice: number;
    cart: CartItem[]
}