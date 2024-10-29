import { DropdownItem } from './DropdownItem'
import clsx, { ClassValue } from 'clsx'
import React, { ReactNode } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export type DropdownProps = {
	data: Array<string>
	onSelect: (value: string) => void
	value: String
	containerStyle?: ClassValue
	inputStyle?: ClassValue
	dropdownContainerStyle?: ClassValue
	optionContainerStyle?: ClassValue
	optionTextStyle?: ClassValue
}

export const Dropdown = ({
	inputStyle,
	containerStyle,
	dropdownContainerStyle,
	data,
	value,
	optionContainerStyle,
	optionTextStyle,
	onSelect,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const btnRef = React.useRef<HTMLDivElement>(null)
	React.useEffect(() => {
		const closeDropDown = (e: any) => {
			if (btnRef.current && !btnRef.current?.contains(e.target)) {
				setIsOpen(false)
			}
		}
		document.body.addEventListener('click', closeDropDown)
		return () => document.body.removeEventListener('click', closeDropDown)
	}, [btnRef])

	const handleOnOpen = () => {
		data.length === 0 ? setIsOpen(false) : setIsOpen(!isOpen)
	}
	const onHandleSelect = (value: string) => {
		setIsOpen(!isOpen)
		onSelect(value)
	}

	return (
		<div
			ref={btnRef}
			className={clsx('relative flex w-[150px] flex-col items-center rounded-lg')}
		>
			<button
				className={clsx(
					'flex w-full items-center justify-between rounded-lg border border-black p-4 font-bold tracking-wider duration-300',
					inputStyle,
				)}
				onClick={handleOnOpen}
			>
				{value}
				{!isOpen ? (
					<ChevronDownIcon className='h-8' />
				) : (
					<ChevronRightIcon className='h-8' />
				)}
			</button>
			{isOpen && (
				<div
					className={clsx(
						'absolute top-20 z-10 flex w-full flex-col rounded-lg border border-black p-2',
						dropdownContainerStyle,
					)}
				>
					{data.map((value, index) => {
						return (
							<DropdownItem
								optionContainerStyle={optionContainerStyle}
								optionTextStyle={optionTextStyle}
								onSelect={() => onHandleSelect(value)}
								key={index}
								content={value}
							></DropdownItem>
						)
					})}
				</div>
			)}
		</div>
	)
}
