import { ORDER_STATE_FIELD } from './variables'

export enum UseQueryKeys {
	Review = 'review',
	User = 'user',
	Product = 'product',
	Order = 'order',
	Variant = 'variant',
	Price = 'price',
	Notification = 'notification',
}

export const ADMIN_QUERY_KEY = 'admin'

export const USER_PURCHASED_PRODUCTS_QUERY_KEYS = [
	UseQueryKeys.Product,
	UseQueryKeys.User,
	UseQueryKeys.Order,
	ORDER_STATE_FIELD.completed.state,
]
