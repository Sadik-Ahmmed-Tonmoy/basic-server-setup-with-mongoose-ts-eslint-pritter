import { model, Schema } from 'mongoose';
import { TVariant } from './variant.interface';

const variantSchema = new Schema<TVariant>(
  {
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
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Variant = model<TVariant>('Variant', variantSchema);
