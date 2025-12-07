import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Native Android Developer',
  description: 'A visual demo of the AI workflow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased bg-background overflow-hidden h-screen w-screen")}>
        {children}
      </body>
    </html>
  )
}
