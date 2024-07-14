import { z } from 'zod';

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be more than 1 character' }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last name must be more than 1 character' }),
  email: z.string().trim().email(),
  password: z.string().refine(
    (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
    { message: 'Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol' }),
  confirmPassword: z.string(),
  
})
.superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });
  }
});