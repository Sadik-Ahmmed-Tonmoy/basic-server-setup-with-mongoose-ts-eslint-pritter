import { z } from 'zod';

const analyticsValidationSchema = z.object({
  body: z.object({
    action: z.enum(['view', 'add_to_cart', 'checkout', 'purchase']),
    productId: z.string().nonempty(),
  }),
});


export const analyticsValidation = {
    analyticsValidationSchema,
}