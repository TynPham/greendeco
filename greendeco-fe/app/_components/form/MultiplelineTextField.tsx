import * as React from 'react'
import { Input } from './Input'
import clsx from 'clsx'
import { TextFieldProps } from '.'

export function MultilineTextField(props: TextFieldProps) {
	const { className, label, helperText, error, register, placeholder } = props

	return (
		<>
			<div className={clsx('flex flex-col gap-compact', className)}>
				{label && <label className='font-bold'>{label}</label>}
				<Input
					multiline
					placeholder={placeholder}
					error={error}
					className='flex-1'
					{...register}
				/>
				{helperText && <p className={clsx({ 'text-status-error': error })}>{helperText}</p>}
			</div>
		</>
	)
}
