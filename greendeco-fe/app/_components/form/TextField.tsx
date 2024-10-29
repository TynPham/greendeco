import * as React from 'react'
import { Input } from './Input'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

export type TextFieldProps = {
	label?: string
	helperText?: string
	type?: React.HTMLInputTypeAttribute
	register?: UseFormRegisterReturn
	className?: string
	placeholder: string
	error: boolean
}

export function TextField(props: TextFieldProps) {
	const { className, label, helperText, type, error, register, placeholder } = props

	return (
		<>
			<div className={clsx('flex flex-col gap-compact', className)}>
				{label && <label className='font-bold'>{label}</label>}
				<Input
					type={type}
					placeholder={placeholder}
					className='w-full'
					{...register}
				/>
				{helperText && <p className={clsx({ 'text-status-error': error })}>{helperText}</p>}
			</div>
		</>
	)
}
