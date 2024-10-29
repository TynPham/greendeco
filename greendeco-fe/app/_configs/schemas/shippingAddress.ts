import * as z from 'zod'
import { REQUIRED_FIELD_STRING } from '../constants/variables'

export const ShippingAddressSchema = z.object({
	city: z.string().min(1, REQUIRED_FIELD_STRING),
	district: z.string().min(1, REQUIRED_FIELD_STRING),
	ward: z.string().min(1, REQUIRED_FIELD_STRING),
	address: z.string().min(1, REQUIRED_FIELD_STRING),
})

export type ShippingAddressFormInputType = z.infer<typeof ShippingAddressSchema>
