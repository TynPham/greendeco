import React from 'react'
import { toast } from 'react-toastify'

export const notifySendReviewSuccess = () => {
	toast.success(<ReviewSendSuccessMessage />, {
		position: 'top-center',
	})
}

const ReviewSendSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='font-semi-bold capitalize text-status-success'>
			Your comment has been saved!
		</h3>
		<p className='text-primary-418-80'>Always rootin’ for ya!</p>
	</div>
)
