export class Product {
    _id: string;
    name: string;
    price: number = 0;
    ordinal: number = 0;
    image: string;
}

export class Cart {
    productId: string;
    unitPrice: number;
    quantity: number;
}

export class Table {
    tableId: number;
    cart: Cart[];
}