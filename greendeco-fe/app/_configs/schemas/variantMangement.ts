import * as z from 'zod'
import { REQUIRED_FIELD_STRING } from '../constants/variables'

export const VariantSchema = z
	.object({
		color: z.string().min(1, REQUIRED_FIELD_STRING).max(10, 'HEX color code only'),
		color_name: z
			.string()
			.min(1, REQUIRED_FIELD_STRING)
			.max(10, 'Color name must be less than 10 character'),
		description: z
			.string()
			.min(10, 'The detail of the product must contain at least 10 characters'),
		is_default: z.boolean(),
		available: z.boolean(),
		price: z.string().min(1, REQUIRED_FIELD_STRING),
	})
	.refine((data) => isOnlyNumer(data.price), {
		path: ['price'],
		message: 'Numbers only',
	})

function isOnlyNumer(data: string) {
	const num = Number(data)
	if (isNaN(num)) return false
	return true
}
export type VariantFormInputType = z.infer<typeof VariantSchema>
