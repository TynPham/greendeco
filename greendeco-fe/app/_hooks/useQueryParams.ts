'use client'

import { all } from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useQueryParams<T>() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const urlSearchParams = new URLSearchParams(searchParams?.toString())
	const urlQueryObject = Object.fromEntries(urlSearchParams)

	function setQueryParams(params: Partial<T>) {
		Object.entries(params).forEach(([key, value]) => {
			if (value === undefined || value === null) {
				urlSearchParams.delete(key)
			} else {
				urlSearchParams.set(key, String(value))
			}
		})

		const search = urlSearchParams.toString()
		const query = search ? `?${search}` : ''
		// replace since we don't want to build a history
		router.replace(`${pathname}${query}`)
	}

	function directToPathWithQueryParams(params: Partial<T>, pathName: string) {
		const newUrlSearchParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => {
			if (value === undefined || value === null) {
				newUrlSearchParams.delete(key)
			} else {
				newUrlSearchParams.set(key, String(value))
			}
		})

		const search = newUrlSearchParams.toString()
		const query = search ? `?${search}` : ''
		// replace since we don't want to build a history
		router.push(`${pathName}${query}`)
	}

	return {
		queryParams: searchParams,
		queryObject: urlQueryObject,
		setQueryParams,
		directToPathWithQueryParams,
	}
}
