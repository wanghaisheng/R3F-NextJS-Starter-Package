import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      await prisma.users.upsert({
        where: {
          email: profile.email,
        },
        create: {
          first_name: profile.name,
          email: profile.email,
        },
        update: {
          first_name: profile.name,
        },
      })

      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
