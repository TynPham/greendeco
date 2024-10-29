import * as z from 'zod'

export const CreateNotificationSchema = z.object({
	title: z.string().min(3, 'Title is required'),
	message: z.string().min(3, 'Message is required'),
})

export type CreateNotificationInputType = z.infer<typeof CreateNotificationSchema>
