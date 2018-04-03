export class Product {
    _id: string;
    name: string;
    price: number = 0;
    quantity: number = 0;
    ordinal: number = 0;
    image: string;
}

export class Table {
    _id: string;
    tableId: number;
    totalPrice: number;
}