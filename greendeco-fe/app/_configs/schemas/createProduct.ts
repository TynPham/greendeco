import * as z from 'zod'
import { REQUIRED_FIELD_STRING } from '../constants/variables'

export const ProductDetailSchema = z.object({
	name: z.string().min(1, REQUIRED_FIELD_STRING).max(32, 'Name must be less than 32 characters'),
	description: z
		.string()
		.min(20, 'The detail of the product must contain at least 20 characters'),
	detail: z.string().min(20, 'The detail of the product must contain at least 20 characters'),
	type: z.string().min(1, REQUIRED_FIELD_STRING),
	size: z.string().min(1, REQUIRED_FIELD_STRING),
	water: z.string().min(1, REQUIRED_FIELD_STRING),
	difficulty: z.string().min(1, REQUIRED_FIELD_STRING),
	light: z.string().min(1, REQUIRED_FIELD_STRING),
})

export type ProductDetailFormInputType = z.infer<typeof ProductDetailSchema>
