"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'

const queryClient = new QueryClient()

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    )
}
