'use client'

import { useEffect } from 'react'

export default function useClickOutside(ref: any, cb: Function) {
	const handleClick = (e: any) => {
		if (ref.current && !ref.current.contains(e.target)) {
			cb()
		}
	}
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}
