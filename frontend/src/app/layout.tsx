"use client"

import './globals.css'


export default function HomeLayout({ children }: { children: React.ReactNode }) {

    return (
            <html>
                <body>

                        {children}
                </body>
            </html>

    )
}