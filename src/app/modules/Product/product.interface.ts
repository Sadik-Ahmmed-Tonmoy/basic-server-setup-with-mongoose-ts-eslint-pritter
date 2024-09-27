import { Types } from "mongoose";

export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  mainImage: string;
  images: string[];
  rating: number;
  numberOfReviews: number;
  reviews: Types.ObjectId[];
  isFeatured: boolean;
  isDeleted: boolean;
}
