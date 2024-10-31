'use client'
import { User } from '@/app/_types/user.type'
import { clientToken } from '@/app/_utils/http'
import { createContext, useContext, useEffect, useState } from 'react'

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
	initUser,
	initToken,
}: {
	children: React.ReactNode
	initUser: User | null
	initToken: string | null
}) {
	const [user, setUser] = useState(initUser)
	useState(() => {
		if (typeof window !== 'undefined') {
			clientToken.setToken(initToken || '')
		}
	})

	useEffect(() => {
		if (initUser) {
			setUser(initUser)
		}
	}, [initUser])

	return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within a AppContextProvider')
	}
	return context
}
