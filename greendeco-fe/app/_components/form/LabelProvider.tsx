import clsx from 'clsx'
import { ReactNode } from 'react'

export default function LabelProvider({
	label,
	className,
	children,
	direction = 'horizontal',
}: {
	className?: string
	direction?: 'horizontal' | 'vertical'
	label: string
	children: ReactNode
}) {
	return (
		<div
			className={clsx('flex  gap-compact', className, {
				'flex-col': direction === 'vertical',
				'flex-row': direction === 'horizontal',
			})}
		>
			<label className='font-bold'>{label}</label>
			{children}
		</div>
	)
}
