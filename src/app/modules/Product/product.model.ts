import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
  
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
    },
    mainImage: {
      type: String,
      required: [true, 'Main Image is required'],
    },
    images: {
      type: [String],
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    numberOfReviews: {
      type: Number,
      required: false,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


export const Product = model<TProduct>('Product', productSchema);