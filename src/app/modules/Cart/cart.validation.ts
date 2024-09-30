import { z } from 'zod';

 const addCartItemValidationSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product ID is required').nonempty(),
    variantId: z.string().min(1, 'Variant ID is required').nonempty(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  }),
});

 const updateCartItemValidationSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product ID is required'),
    variantId: z.string().min(1, 'Variant ID is required').nonempty(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  }),
});

 const removeCartItemValidationSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product ID is required'),
    variantId: z.string().min(1, 'Variant ID is required').nonempty(),
  }),
});


export const CartValidation = {
  addCartItemValidationSchema,
  updateCartItemValidationSchema,
  removeCartItemValidationSchema,
}