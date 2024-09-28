import { Types } from "mongoose";

export interface TCartItem {
    product: Types.ObjectId;
    quantity: number;
}

export interface TCart {
    user: Types.ObjectId;
    cartItems: TCartItem[];
}