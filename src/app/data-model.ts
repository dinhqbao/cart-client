export class Product {
    _id: string;
    name: string;
    price: number = 0;
    quantity: number = 0;
    ordinal: number = 0;
    image: string = '';
    note: string;
}

export class Table {
    _id: string;
    name: string;
    ordinal: number;
    totalPrice: number = 0;
}

export class Order {
    _id: any;
    tableName: string;
    products: any[];
    status: OrderStatus = OrderStatus.New;
}

export enum OrderStatus {
    New = 0,
    Success = 1,
    Paid = 2
}

export let ServerUrl: String = '192.168.1.5';