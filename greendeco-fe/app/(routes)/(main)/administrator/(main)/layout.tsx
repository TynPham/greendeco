import { ReactNode } from 'react'
import { AdministratorHeader as Header } from '../Header'

export default function AdministratorMainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className='bg-primary-5555-20'>
				<div className='container'>{children}</div>
			</main>
		</>
	)
}
