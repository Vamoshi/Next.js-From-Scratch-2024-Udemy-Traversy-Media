"use client";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type GlobalContextType = {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>
}

// Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

// Create Context Provider
export function GlobalContextProvider({ children }: Props) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession()

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count)
      })
    }
  }, [session])


  return <GlobalContext.Provider
    value={{
      unreadCount,
      setUnreadCount
    }}
  >
    {children}
  </GlobalContext.Provider>
}

export function UseGlobalContext() {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error("UserGlobalContext must be used within a GlobalContextProvider");
  }

  return context
}