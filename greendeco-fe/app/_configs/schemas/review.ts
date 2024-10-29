import * as z from 'zod'

export const ReviewSchema = z
	.object({
		content: z
			.string()
			.min(5, 'Your comment needs to have more than 5 characters')
			.max(120, 'No more than 120 characters'),
		star: z.string(),
	})
	.refine((data) => parseInt(data.star) > 0, {
		path: ['star'],
		message: 'Please leave a rating',
	})

export type ReviewFormInputType = z.infer<typeof ReviewSchema>
