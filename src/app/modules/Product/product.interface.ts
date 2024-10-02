import { Types } from 'mongoose';
import { TVariant } from '../Variant/variant.interface';

export interface TProduct {
  name: string;
  brand: string;
  description: string;
  category: string;
  mainImage: string;
  rating: number;
  numberOfReviews: number;
  reviews: Types.ObjectId[];
  variants: Types.ObjectId[];
  isFeatured: boolean;
  isDeleted: boolean;
}

export interface TUpdateProduct {
  name: string;
  brand: string;
  description: string;
  category: string;
  mainImage: string;
  rating: number;
  numberOfReviews: number;
  reviews: Types.ObjectId[];
  variants:  TVariant[];
  isFeatured: boolean;
  isDeleted: boolean;
}
