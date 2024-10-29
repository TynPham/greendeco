import { MIN_PASSWORD, MAX_PASSWORD } from '../constants/variables'
import * as z from 'zod'
import { validatePhoneForE164 } from './authentication'

export const UserProfileSchema = z
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
	})
	.refine((data) => validatePhoneForE164(data.phoneNumber), {
		path: ['phoneNumber'],
		message: 'Invalid phone number',
	})

export type UserProfileFormInputType = z.infer<typeof UserProfileSchema>
