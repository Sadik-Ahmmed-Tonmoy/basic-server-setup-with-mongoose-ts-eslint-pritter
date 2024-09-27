import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Product name is required.',
      })
      .min(3, 'Product name is required.')
      .max(255),
    description: z
      .string({ message: 'Product description is required.' })
      .min(3, 'Product description is required.'),
    price: z
      .number({ message: 'Product price is required.' })
      .min(1, 'Product price is required.'),
    category: z
      .string({ message: 'Product category is required.' })
      .min(3, 'Product category is required.')
      .max(255),
    stock: z
      .number({ message: 'Product stock is required.' })
      .min(1, 'Product stock is required.'),
    mainImage: z
      .string({ message: 'Product main image is required.' })
      .min(3, 'Product main image is required.'),
    images: z
      .array(
        z
          .string({ message: 'Product images is required.' })
          .url('Invalid image URL.'),
      )
      .optional(),
    rating: z.number().min(1).max(5).optional(),
    numberOfReviews: z.number().optional(),
    reviews: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional().default(false),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateProductSchema =  z.object({
  body: z.object({
    name: z
      .string({
        message: 'Product name is required.',
      })
      .min(3, 'Product name is required.')
      .max(255).optional(),
    description: z
      .string({ message: 'Product description is required.' })
      .min(3, 'Product description is required.').optional(),
    price: z
      .number({ message: 'Product price is required.' })
      .min(1, 'Product price is required.').optional(),
    category: z
      .string({ message: 'Product category is required.' })
      .min(3, 'Product category is required.')
      .max(255).optional(),
    stock: z
      .number({ message: 'Product stock is required.' })
      .min(1, 'Product stock is required.').optional(),
    mainImage: z
      .string({ message: 'Product main image is required.' })
      .min(3, 'Product main image is required.').optional(),
    images: z
      .array(
        z
          .string({ message: 'Product images is required.' })
          .url('Invalid image URL.'),
      )
      .optional(),
    rating: z.number().min(1).max(5).optional(),
    numberOfReviews: z.number().optional(),
    isFeatured: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductSchema,
};
