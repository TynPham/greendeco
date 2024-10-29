'use client'
import Button from '@/app/_components/Button'
import Image from 'next/image'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'
import Link from 'next/link'
import { ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import useSidebar from '@/app/_hooks/dialog/useAdminSidebarDialog'
import useActivePath from '@/app/_hooks/useActivePath'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { deleteCookie } from 'cookies-next'
import { useQueryClient } from '@tanstack/react-query'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ADMIN_QUERY_KEY } from '@/app/_configs/constants/queryKey'
import { useRouter } from 'next/navigation'

export const AdministratorHeader = () => {
	return (
		<header className=''>
			<div className='relative flex h-[60px] w-full items-center justify-between bg-neutral-gray-1 pr-comfortable shadow-63'>
				<SideBarButton />
				<Logo />
				<LogoutButton />
			</div>
		</header>
	)
}

function SideBarButton() {
	const { openSidebar } = useSidebar()
	const { isPathActive } = useActivePath()
	return (
		<Button
			onClick={() => openSidebar()}
			className='flex h-full items-center gap-cozy rounded-none border-none bg-primary-580-20 p-cozy text-body-lg text-primary-625'
		>
			<Bars3Icon className='aspect-square h-[20px]' />
			{isPathActive(ADMINISTRATOR_ROUTE.ORDER.LINK)
				? ADMINISTRATOR_ROUTE.ORDER.LABEL
				: isPathActive(ADMINISTRATOR_ROUTE.PRODUCT.LINK) &&
				  ADMINISTRATOR_ROUTE.PRODUCT.LABEL}
		</Button>
	)
}

function Logo() {
	return (
		<span className='absolute inset-y-0 left-[50%] translate-x-[-50%]  '>
			<Link
				href={'/'}
				className='relative inline-block h-full w-[180px]  overflow-hidden  '
			>
				<Image
					src={BrandLogoFullGreen}
					alt='Welcome to GreenDeco'
					width={0}
					height={0}
					sizes='100vw'
				/>
			</Link>
		</span>
	)
}

function LogoutButton() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const handleLogOut = () => {
		deleteCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
		queryClient.removeQueries([ADMIN_QUERY_KEY])
		router.push(ADMINISTRATOR_ROUTE.LOGIN.LINK)
	}
	return (
		<span
			onClick={handleLogOut}
			className='cursor-pointer rounded-[100%] border-[1px] border-neutral-gray-5 bg-neutral-gray-3 p-compact'
		>
			<ArrowLeftOnRectangleIcon className='aspect-square h-[24px] text-black' />
		</span>
	)
}
