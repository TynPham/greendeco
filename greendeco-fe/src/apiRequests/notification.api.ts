import { FilterParams } from '../types'
import { CreateNotification, NotificationListResponseData } from '../types/notification.type'
import { http } from '../utils/http'
import { fieldJSONParse } from './product.api'

const notificationApis = {
  getNotificationFromUser: (params?: FilterParams) => {
    let paramAfterJSON
    if (params) {
      paramAfterJSON = fieldJSONParse(params)
    }

    return http.get<NotificationListResponseData>('/notification', {
      params: { ...paramAfterJSON }
    })
  },

  createNotification: (body: { title: string; message: string; description: string }) =>
    http.post<CreateNotification>('/notification', body),

  sendNotification: ({
    notificationId,
    userList
  }: {
    notificationId: string
    userList: string[]
  }) =>
    http.post('/notification/send', {
      users: userList,
      notification_id: notificationId
    })
}

export default notificationApis
