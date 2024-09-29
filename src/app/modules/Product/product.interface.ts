import { Types } from "mongoose";

export interface TVariant {
  _id?: Types.ObjectId;
  variant_name: string;
  code: string;
  price: number;
  stock: number;
  images: string[];
  isDeleted: boolean;
}


export interface TProduct {
  name: string;
  description: string;
  category: string;
  mainImage: string;
  rating: number;
  numberOfReviews: number;
  reviews: Types.ObjectId[];
  variants: TVariant[];
  isFeatured: boolean;
  isDeleted: boolean;
}

