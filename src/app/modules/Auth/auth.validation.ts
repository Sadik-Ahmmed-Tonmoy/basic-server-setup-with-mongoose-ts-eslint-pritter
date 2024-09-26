import { z } from 'zod';

const loginValidationSchema = z.object({
  // body: z.object({
  //   userIdOrEmail: z.union([
  //     z.string({ required_error: 'userId or email is required.' }),
  //     z.string().email({ message: 'Invalid email format' }),
  //   ]),
  //   password: z.string({ required_error: 'Password is required' }),
  // }),
  body: z.object({
    userIdOrEmail: z.string({ required_error: 'userId or Email is required.' }).nonempty( { message: 'userId or Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
}); 

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    userIdOrEmail: z.string({
      required_error: 'User id or Email is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
