import { z } from 'zod';

const variantValidationSchema = z.object({
  body: z.object({
    _id: z.string().optional(),
    variant_name: z.string({ message: 'Variant name is required' }).min(1),
    code: z.string({ message: 'Variant code is required' }).min(1),
    size: z.string({ message: 'Variant size is required' }).optional(),
    color: z.string({ message: 'Variant color is required' }).optional(),
    price: z.number({ message: 'Variant price is required' }).min(0),
    stock: z.number({ message: 'Variant stock is required' }).min(0),
    images: z.array(z.string().url('Invalid image URL')),
    isDeleted: z.boolean().optional().default(false),
    product: z.string({ message: 'Product ID is required' }),
  }),
});

export const VariantValidation = {
  variantValidationSchema,
};
