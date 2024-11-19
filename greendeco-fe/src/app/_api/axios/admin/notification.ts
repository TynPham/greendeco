import { http } from '@/src/app/_utils/http'

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

export const createNotification = async (title: string, message: string, description: string) => {
  return await http
    .post<CreateNotification>('/notification/', {
      title: title,
      message: message,
      description: description
    })
    .then((response) => response.data)
}

export const sendNotification = async (notificationId: string, userList: string[]) => {
  return await http.post(`/notification/send`, {
    users: userList,
    notification_id: notificationId
  })
}
