'use client'
import { usePathname } from 'next/navigation'

export default function useActivePath() {
	const currentPath = usePathname()
	const isPathActive = (path: string) => {
		return currentPath.includes(path)
	}

	return { isPathActive: isPathActive }
}
