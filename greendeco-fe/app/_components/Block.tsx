import { ReactNode } from 'react'

export default function Block({ children }: { children: ReactNode }) {
	return <div className=' rounded-[8px] bg-white p-comfortable shadow-30'>{children}</div>
}
