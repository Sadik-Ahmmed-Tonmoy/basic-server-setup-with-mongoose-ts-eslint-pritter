import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const variantSchema = new Schema({
  variant_name: {
    type: String,
    required: [true, 'Variant name is required'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Variant code is required'],
    trim: true,
  },
  size: {
    type: String,
    required: false,
    trim: true,
  },
  color: {
    type: String,
    required: false,
    trim: true,
  },

  price: {
    type: Number,
    required: [true, 'Variant price is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Variant stock is required'],
  },
  images: {
    type: [String],
    required: [true, 'Variant images are required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },

    mainImage: {
      type: String,
      required: [true, 'Main Image is required'],
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
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }], 
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
