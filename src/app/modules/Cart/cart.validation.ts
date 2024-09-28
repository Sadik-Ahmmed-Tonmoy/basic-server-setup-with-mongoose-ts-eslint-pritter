import { z } from 'zod';

export const addCartItemSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  }),
});

export const removeCartItemSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'Product ID is required'),
  }),
});
