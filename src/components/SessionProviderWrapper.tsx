"use client"
// SessionProvider wraps entire project from layout
// However, it needs a client component and we dont want layout to be a client component
// That's why we're wrapping the SessionProvider in AuthProvider
import { SessionProvider } from 'next-auth/react'

import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const SessionProviderWrapper = ({ children }: Props) => {
    return (
        <SessionProvider>{children}</SessionProvider>

    )
}

export default SessionProviderWrapper