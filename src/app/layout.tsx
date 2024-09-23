import "@/assets/styles/globals.css"
import Navbar from "@/components/Navbar"

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
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout