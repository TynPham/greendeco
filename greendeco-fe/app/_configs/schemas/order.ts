import * as z from 'zod'

export const OrderUpdateSchema = z.object({
	paid_at: z.string().min(1, 'Paid at is required'),
})

export type OrderUpdateSchemaType = z.infer<typeof OrderUpdateSchema>
