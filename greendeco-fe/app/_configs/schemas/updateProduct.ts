import * as z from 'zod'
import { REQUIRED_FIELD_STRING } from '../constants/variables'

export const UpdateProductDetailSchema = z.object({
	description: z
		.string()
		.min(20, 'The detail of the product must contain at least 20 characters'),
	detail: z.string().min(20, 'The detail of the product must contain at least 20 characters'),
	available: z.boolean(),
	is_publish: z.boolean(),
	type: z.string().min(1, REQUIRED_FIELD_STRING),
	size: z.string().min(1, REQUIRED_FIELD_STRING),
	water: z.string().min(1, REQUIRED_FIELD_STRING),
	difficulty: z.string().min(1, REQUIRED_FIELD_STRING),
	light: z.string().min(1, REQUIRED_FIELD_STRING),
})

export type UpdateProductDetailFormInputType = z.infer<typeof UpdateProductDetailSchema>
