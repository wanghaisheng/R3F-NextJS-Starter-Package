import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const JWT_SECRET = process.env.JWT_SECRET

export const generateJwt = (id) => {
  const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '1h' })
  return token
}

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
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const existingUser = await prisma.users.findUnique({
        where: {
          email: profile.email,
        },
      })

      if (!existingUser) {
        const newUser = await prisma.users.create({
          data: {
            email: profile.email,
          },
        })
        generateJwt(newUser.gg_id)
      } else {
        throw new Error('User already exists')
      }
      return true
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
