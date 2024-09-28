import { Types } from "mongoose";


export interface TReview {
    product: Types.ObjectId;
    user: Types.ObjectId;
    rating: number;
    comment: string;
    isDeleted: boolean;
}