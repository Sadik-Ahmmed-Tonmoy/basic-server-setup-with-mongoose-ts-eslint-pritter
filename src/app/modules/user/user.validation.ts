import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    user: z.object({
      userId: z.string().nonempty(),
      name: z.object({
        firstName: z.string().nonempty(),
        lastName: z.string().nonempty(),
      }),
      // email: z
      // .string({
      //     required_error: "Email is required",
      // })
      // .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
      email: z.string({ message: 'Email is required' }).email(),
      phone: z.string().nonempty(),
      password: z
        .string()
        .nonempty()
        .max(20, { message: 'Password can not be more than 20 characters' }),
      needChangePassword: z.boolean().optional().default(true),
      avatar: z.string().optional(),
      role: z.enum(['superAdmin', 'admin', 'user']),
      status: z.enum(['active', 'inactive']).default('active'),
      address: z
        .object({
          city: z.string().nonempty(),
          zone: z.string().nonempty(),
          area: z.string().nonempty(),
          detailsAddress: z.string().nonempty(),
        })
        .optional(),
    }),
  }),
});

export const UserValidation = { userValidationSchema };
