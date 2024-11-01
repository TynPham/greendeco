'use client'

import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useAppContext } from '@/app/_configs/store/useAppContext'
import useClickOutside from '@/app/_hooks/useClickOutside'
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { deleteCookie } from 'cookies-next'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function AuthenticationDisplayButton() {
	// return (
	// 	<div className='relative'>
	// 		<button className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'>
	// 			<UserCircleIcon className='aspect-square h-[24px] ' />
	// 		</button>
	// 	</div>
	// )
	const router = useRouter()
	const { user } = useAppContext()

	return (
		<div className='block md:hidden'>
			{user && <UserSettingMenu />}
			{!user && (
				<button
					onClick={() => router.push('/login')}
					className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
				>
					<UserCircleIcon className='aspect-square h-[24px] ' />
				</button>
			)}
		</div>
	)
}

function UserSettingMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const queryClient = useQueryClient()
	const settingMenuRef = useRef<any>()

	useClickOutside(settingMenuRef, () => {
		setIsOpen(false)
	})
	const router = useRouter()

	const handleLogOut = () => {
		deleteCookie(ACCESS_TOKEN_COOKIE_NAME)
		queryClient.removeQueries([UseQueryKeys.User])
		router.push('/login')
	}

	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latestWindowY) => {
		const previousWindowY = scrollY.getPrevious()
		if (latestWindowY > previousWindowY && latestWindowY > 90) {
			setIsOpen(false)
		}
	})

	return (
		<div
			ref={settingMenuRef}
			onClick={() => setIsOpen(!isOpen)}
			className='relative h-full w-full'
		>
			<button className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'>
				<UserCircleIcon className='aspect-square h-[24px] ' />
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{
							translateY: '-16px',
							opacity: 0,
						}}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{
							opacity: 0,
							translateY: '-16px',
						}}
						transition={{ ease: 'easeInOut', duration: 0.2 }}
						className='absolute -left-60 right-0 top-[calc(100%+8px)] z-30 rounded-[8px] border-[1px] border-primary-5555-40 bg-white p-compact md:inset-x-0'
					>
						<MenuItem onClick={() => router.push('/user/setting/profile')}>
							<div className='flex h-full w-full items-center gap-compact'>
								<Cog8ToothIcon className='aspect-square h-[16px]' />
								user setting
							</div>
						</MenuItem>
						<MenuItem onClick={() => handleLogOut()}>
							<div className='flex h-full w-full items-center gap-compact'>
								<ArrowLeftOnRectangleIcon className='aspect-square h-[16px]' />
								log out
							</div>
						</MenuItem>
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}

function MenuItem({
	onClick,
	children,
	className,
}: {
	onClick?: () => void
	children: React.ReactNode
	className?: string
}) {
	return (
		<li
			className={clsx(
				'w-full cursor-pointer rounded-[8px] px-[8px] py-[12px] text-body-sm capitalize hover:bg-primary-5555-20/40',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</li>
	)
}
