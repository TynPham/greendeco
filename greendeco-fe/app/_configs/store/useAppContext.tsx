'use client'
import { clientToken } from '@/app/_utils/http'
import { createContext, useEffect, useState } from 'react'

type AppContextType = {
	user: any
	setUser: (user: any) => void
}
const initAppContext: AppContextType = {
	user: '',
	setUser: () => {},
}

export const AppContext = createContext<AppContextType | undefined>(initAppContext)

export default function AppContextProvider({
	children,
	initToken,
}: {
	children: React.ReactNode
	initToken: string
}) {
	const [user, setUser] = useState(initAppContext.user)
	useEffect(() => {
		if (initToken) {
			clientToken.setToken(initToken)
		}
	}, [initToken])

	return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
