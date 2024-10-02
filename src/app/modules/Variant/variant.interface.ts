import { Types } from 'mongoose';

export interface TVariant {
  _id?: Types.ObjectId;
  variant_name: string;
  code: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
  images: string[];
  isDeleted: boolean;
  product: Types.ObjectId; // Reference to Product
}
