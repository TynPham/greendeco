'use client'
import { User } from '@/src/app/_types/user.type'
import React, { createContext, useContext, useEffect, useState } from 'react'

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
}: {
  children: React.ReactNode
  initUser: User | null
}) {
  const [user, setUser] = useState(initUser)

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
