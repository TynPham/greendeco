import axios from 'axios'

const NOTIFICAION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

type AdminAccessTokenType = string | undefined

export type NotificationData = {
	id: string
	title: string
	message: string
	description?: string
	created_at: string
	updated_at: string
}

type CreateNotification = {
	id: NotificationData['id']
}

export const adminNotificationApi = axios.create({
	baseURL: NOTIFICAION_URL,
})

export const createNotification = async (
	adminAccessToken: AdminAccessTokenType,
	title: string,
	message: string,
	description: string,
) => {
	return await adminNotificationApi
		.post<CreateNotification>(
			'/notification/',
			{
				title: title,
				message: message,
				description: description,
			},
			{
				headers: {
					Authorization: `Bearer ${adminAccessToken}`,
				},
			},
		)
		.then((response) => response.data)
}

export const sendNotification = async (
	adminAccessToken: AdminAccessTokenType,
	notificationId: string,
	userList: string[],
) => {
	return await adminNotificationApi.post(
		`/notification/send`,
		{
			users: userList,
			notification_id: notificationId,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}
