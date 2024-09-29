import { z } from 'zod';

const variantValidationSchema = z.object({
  _id: z.string().optional(),
  variant_name: z.string({ message: 'Variant name is required' }).min(1),
  code: z.string({ message: 'Variant code is required' }).min(1),
  price: z.number({ message: 'Variant price is required' }).min(0),
  stock: z.number({ message: 'Variant stock is required' }).min(0),
  images: z.array(z.string().url('Invalid image URL')),
  isDeleted: z.boolean().optional().default(false),
});

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
    category: z
      .string({ message: 'Product category is required.' })
      .min(3, 'Product category is required.')
      .max(255),
    mainImage: z
      .string({ message: 'Product main image is required.' })
      .min(3, 'Product main image is required.'),
    variants: z
      .array(variantValidationSchema)
      .min(1, 'At least one variant is required'),
    rating: z.number().min(1).max(5).optional(),
    numberOfReviews: z.number().optional(),
    reviews: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional().default(false),
    isDeleted: z.boolean().optional().default(false),
  }),
});


const updateVariantValidationSchema = z.object({
  _id: z.string().optional(),
  variant_name: z.string({ message: 'Variant name is required' }).min(1).optional(),
  code: z.string({ message: 'Variant code is required' }).min(1).optional(),
  price: z.number({ message: 'Variant price is required' }).min(0).optional(),
  stock: z.number({ message: 'Variant stock is required' }).min(0).optional(),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  isDeleted: z.boolean().optional(),
}); 

const updateProductSchema = z.object({
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
    category: z
      .string({ message: 'Product category is required.' })
      .min(3, 'Product category is required.')
      .max(255).optional(),
    mainImage: z
      .string({ message: 'Product main image is required.' })
      .min(3, 'Product main image is required.').optional(),
    variants: z
      .array(variantValidationSchema)
      .min(1, 'At least one variant is required').optional(),
    rating: z.number().min(1).max(5).optional(),
    numberOfReviews: z.number().optional(),
    reviews: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});



export const ProductValidation = {
  createProductValidationSchema,
  updateProductSchema,
};
