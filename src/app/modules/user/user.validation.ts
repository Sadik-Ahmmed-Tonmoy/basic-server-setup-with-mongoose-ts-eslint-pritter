import { z } from 'zod';
import { UserStatus } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
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
    status: z.enum([...UserStatus] as [string, ...string[]]).optional().default('in-progress'),
    address: z
      .object({
        city: z.string().nonempty(),
        zone: z.string().nonempty(),
        area: z.string().nonempty(),
        detailsAddress: z.string().nonempty(),
      })
      .optional(),
  }),
});


const updateUserValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    // email: z
    // .string({
    //     required_error: "Email is required",
    // })
    // .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
    email: z.string({ message: 'Email is required' }).email().optional(),
    phone: z.string().optional(),
    password: z
      .string()
      .max(20, { message: 'Password can not be more than 20 characters' }).optional(),
    needChangePassword: z.boolean().optional(),
    avatar: z.string().optional(),
    role: z.enum(['superAdmin', 'admin', 'user']).optional(),
    status: z.enum([...UserStatus] as [string, ...string[]]).optional(),
    address: z
      .object({
        city: z.string().optional(),
        zone: z.string().optional(),
        area: z.string().optional(),
        detailsAddress: z.string().optional(),
      })
      .optional(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = { createUserValidationSchema, updateUserValidationSchema, changeStatusValidationSchema };
