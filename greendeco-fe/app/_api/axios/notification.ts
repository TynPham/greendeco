import axios from 'axios'
import { NotificationData } from './admin/notification'
import { AccessTokenType } from '@/app/_types'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { FilterParams, fieldJSONParse } from './product'

const NOTIFICAION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/notification`

export type NotificationListResponseData = {
	items: NotificationData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export const notificationApi = axios.create({
	baseURL: NOTIFICAION_URL,
})

export const getNotificationFromUser = async (params?: FilterParams) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}
	const accessToken: AccessTokenType = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await notificationApi
		.get<NotificationListResponseData>('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}
