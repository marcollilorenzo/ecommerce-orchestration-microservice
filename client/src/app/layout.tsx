import Header from '@/components/header/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      className={inter.className + ' text-gray-900 bg-gray-100 mx-auto md:max-w-7xl'}
      >
        <Header />
        <main className='mx-4'>{children}</main>
      </body>
    </html>
  )
}
