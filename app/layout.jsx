import { Layout } from '@/components/dom/Layout'
import '@/global.css'
// import { UserProvider } from '@/context/UserContext/UserContext'
import UserProvider from './UserProvider'

export const metadata = {
  title: 'Going Genius Next.js+ReactThreeFiber+Visage Starter Bundle',
  description: 'A minimal starter for Nextjs + React-three-fiber and Visage',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-gray-100 text-slate-800 antialiased dark:bg-black/90 dark:text-white/90'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </body>
    </html>
  )
}
