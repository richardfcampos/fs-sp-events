"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/authContext';
import './globals.css'

const queryClient = new QueryClient()

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
