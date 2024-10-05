import "@/assets/styles/globals.css"
import { Footer, Navbar } from "@/components"
import { SessionProviderWrapper } from "@/components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
        <SessionProviderWrapper>
            <html lang="en">
                <body>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <ToastContainer />
                </body>
            </html>
        </SessionProviderWrapper>
    )
}

export default MainLayout