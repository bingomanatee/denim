import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/provider'
import { Noto_Serif, Space_Mono, Prompt, Oswald } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const sm = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

/*
export const metadata: Metadata = {
  title: 'DENIM',
  description: 'The Denim Page',
}
*/

export const ns = Noto_Serif({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const pr = Prompt({
  weight: ['400', '500', '600', '800'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
})

export const os = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
})


export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className={[inter.className].join(' ')}>
    <body className={[ns.className].join(' ')}>
      {children}
    </body>
    </html>
  )
}
