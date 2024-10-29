import { OrderState, Sort, SortBy } from './paramKeys'

import { FilterParams } from '@/app/_api/axios/product'

export const MIN_PASSWORD = 8
export const MAX_PASSWORD = 50

export const MIN_SEARCH_VALUE = 3

export const IMAGE_MAX_SIZE_IN_MB = 5

export const REQUIRED_FIELD_STRING = 'This field is required'

export const EMPTY_STRING = 'empty'

export const VARIANT_CURRENCY = 'USD'

export const SIZE_OPTIONS = ['S', 'M', 'L', 'XL']
export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard']
export const TYPE_OPTIONS = ['Outdoor', 'Indoor']

export const RATING_GRADES = [1, 2, 3, 4, 5]

export const INVALID_NAME_STRING = '129038@!()8sdf901'

export const ADMINISTRATOR_ROUTE = {
	PRODUCT: {
		LINK: '/administrator/product',
		LABEL: 'Product Management',
	},
	ORDER: {
		LINK: '/administrator/order',
		LABEL: 'Order Management',
	},
	ORDER_DETAIL: {
		LINK: '/administrator/order/order-detail',
		LABEL: 'Order Detail',
	},
	LOGIN: {
		LINK: '/administrator/login',
	},
}

export const USER_SETTING_ROUTE = {
	ORDER: {
		LINK: '/user/order',
		LABEL: 'Product Management',
	},
	SETTING: {
		PROFILE: {
			LINK: '/user/setting/profile',
			LABEL: 'User Profile Setting',
		},
		PASSWORD: {
			LINK: '/user/setting/changepassword',
			LABEL: 'User Password Setting',
		},
	},
}

export const SHOP_ROUTE = {
	SHOP_LIST: {
		LINK: '/shop/product-list',
	},
	PRODUCT_DETAIL: {
		LINK: '/shop/product-detail',
	},
	SEARCH: {
		LINK: '/search-result',
	},
}

export const AUTHENTICATION_ROUTE = {
	LOGIN: {
		LINK: '/login',
	},
	REGISTER: {
		LINK: '/register',
	},
	FORGOT_PASSWORD: {
		LINK: '/forgot-password',
	},
	RESET_PASSWORD: {
		LINK: '/reset-password',
	},
	EMAIL_SEND_SUCCESS: {
		LINK: '/forgot-password/email-send-success',
	},
	ADMIN_LOGIN: {
		LINK: '/administrator/login',
	},
}

export const ORDER_STATE_FIELD = {
	draft: {
		state: OrderState.Draft,
	},
	processing: {
		state: OrderState.Processing,
	},
	completed: {
		state: OrderState.Completed,
	},
	cancelled: {
		state: OrderState.Cancelled,
	},
}

export const FEATURE_PRODUCT_PARAMS = {
	new: {
		sort: Sort.Descending,
		sortBy: SortBy.CreatedAt,
	},
	topRated: {
		sort: Sort.Descending,
		sortBy: 'name',
	},
	cheap: {
		sort: Sort.Ascending,
		sortBy: SortBy.Price,
	},
}
