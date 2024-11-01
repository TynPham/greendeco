import { NotificationData } from './admin/notification'
import { FilterParams, fieldJSONParse } from './product'
import { http } from '@/app/_utils/http'

export type NotificationListResponseData = {
	items: NotificationData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export const getNotificationFromUser = async (params?: FilterParams) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}

	return await http
		.get<NotificationListResponseData>('/notification', {
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}
