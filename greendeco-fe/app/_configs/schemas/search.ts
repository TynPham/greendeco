import * as z from 'zod'
import { MIN_SEARCH_VALUE } from '../constants/variables'

export const ProductSearchSchema = z
	.object({
		search: z
			.string()
			.min(MIN_SEARCH_VALUE, `Must have at least ${MIN_SEARCH_VALUE} characters`),
	})
	.refine((data) => isCharacterOnly(data.search), {
		path: ['search'],
		message: 'Only contain characters',
	})

export type ProductSearchFormInputType = z.infer<typeof ProductSearchSchema>

function isCharacterOnly(string: string) {
	var IsCharacterOnlyRegex = /^[a-zA-Z]+$/
	const trimString = string.replace(/ /g, '')
	return IsCharacterOnlyRegex.test(trimString)
}
