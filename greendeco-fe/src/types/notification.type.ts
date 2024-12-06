export type NotificationData = {
  id: string
  title: string
  message: string
  description?: string
  created_at: string
  updated_at: string
}

export type NotificationListResponseData = {
  items: NotificationData[]
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type CreateNotification = {
  id: NotificationData['id']
}
