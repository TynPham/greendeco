'use client'
import { RATING_GRADES } from '@/app/_configs/constants/variables'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type RatingProps = {
	label?: string
	helperText?: string
	register?: UseFormRegisterReturn
	className?: string
	starWrapperClassName?: string
	error?: boolean
}

export default function Rating(props: RatingProps) {
	const { className, label, helperText, error, register, starWrapperClassName } = props
	const [rating, setRating] = useState<number>(0)

	//NOTE: Cache the constant value
	const ratingGrades = useMemo(() => RATING_GRADES, [])

	return (
		<>
			<div className={clsx('flex-col-start gap-compact', className)}>
				{label && <label className='font-bold'>{label}</label>}
				<span
					className={clsx(
						starWrapperClassName,
						'flex h-[40px]  w-full items-center justify-center gap-compact',
					)}
				>
					{ratingGrades.map((star) => {
						return (
							<label
								className='h-full'
								key={star}
							>
								<input
									{...register}
									type='radio'
									className='hidden'
									id={`star-${star}`}
									value={star}
									onClick={() => setRating(star)}
								/>
								<StarIcon
									className={clsx('aspect-square h-full cursor-pointer', {
										'text-status-success': star <= rating,
										'text-neutral-gray-4': star > rating,
									})}
								/>
							</label>
						)
					})}
				</span>
				{helperText && <p className={clsx({ 'text-status-error': error })}>{helperText}</p>}
			</div>
		</>
	)
}
