import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    orderItems: z.array(
      z.object({
        productId: z.string().min(1, 'Product ID is required').nonempty(),
        variantId: z.string().min(1, 'Variant ID is required').nonempty(),
        name: z.string().min(1, 'Name is required').nonempty(),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().min(0.01, 'Price must be greater than 0'),
        thumbnailImg: z.string().min(1, 'Thumbnail is required').nonempty(),
      }),
    ),
    shippingAddress: z
      .string()
      .min(1, 'Shipping Address is required')
      .nonempty(),
    paymentMethod: z.enum(['cod', 'online']),
  }),
});


const updateOrderValidationSchema = z.object({
  body: z.object({
    orderStatus: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  })
})
export const orderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema
};
