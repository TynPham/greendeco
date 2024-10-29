import clxs, { ClassValue } from 'clsx'
import React from 'react'

type DropdownItemProps = {
	content: String
	onSelect: (value: any) => void
	optionContainerStyle?: ClassValue
	optionTextStyle?: ClassValue
}

export const DropdownItem = ({
	content,
	onSelect,
	optionContainerStyle,
	optionTextStyle,
}: DropdownItemProps) => {
	return (
		<div
			className={clxs(
				' flex w-full cursor-pointer justify-between rounded-r-lg border-l border-l-transparent p-4 hover:border-l-black hover:bg-primary-5555-20/50',
				optionContainerStyle,
			)}
			onClick={onSelect}
		>
			<h3 className={clxs('text-lg font-bold capitalize', optionTextStyle)}> {content}</h3>
		</div>
	)
}
