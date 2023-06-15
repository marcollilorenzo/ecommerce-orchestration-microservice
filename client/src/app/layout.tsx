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
      className={inter.className + ' text-gray-900 bg-gray-100 mx-auto max-w-7xl '}
      >
        <main className='mx-4 md:mx-0'>{children}</main>
      </body>
    </html>
  )
}
