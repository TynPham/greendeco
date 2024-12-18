import { MIN_PASSWORD, MAX_PASSWORD } from '../constants/variables'
import * as z from 'zod'

export function validatePhone(phoneNumber: string) {
  const regEx = /^(0)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])([0-9]{7})$/

  return regEx.test(phoneNumber)
}

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(32, 'Name must be less than 32 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(32, 'Name must be less than 32 characters'),
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    phoneNumber: z.string().min(1, 'Phone number is required').max(12, 'Invalid phone number'),
    password: z
      .string()
      .min(MIN_PASSWORD, `Password must be more than ${MIN_PASSWORD} characters`)
      .max(MAX_PASSWORD, `Password must be less than ${MAX_PASSWORD} characters`),
    passwordConfirm: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match'
  })
  .refine((data) => validatePhone(data.phoneNumber), {
    path: ['phoneNumber'],
    message: 'Invalid phone number'
  })

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z
    .string()
    .min(MIN_PASSWORD, `Password must be more than ${MIN_PASSWORD} characters`)
    .max(MAX_PASSWORD, `Password must be less than ${MAX_PASSWORD} characters`)
})

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(MIN_PASSWORD, `Password must be more than ${MIN_PASSWORD} characters`)
      .max(MAX_PASSWORD, `Password must be less than ${MAX_PASSWORD} characters`),
    passwordConfirm: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match'
  })

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid')
})

export type RegisterFormInputType = z.infer<typeof RegisterSchema>
export type LoginFormInputType = z.infer<typeof LoginSchema>
export type ForgotPasswordFormInputType = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordFormInputType = z.infer<typeof ResetPasswordSchema>
