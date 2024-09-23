import "@/assets/styles/globals.css"

import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const metadata = {
    title: 'Property Pulse',
    keywords: 'Some keywords',
    description: "Find your perfect renal property"
}

const MainLayout = ({ children }: Props) => {
    return (
        <html lang="en">
            <body>
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout