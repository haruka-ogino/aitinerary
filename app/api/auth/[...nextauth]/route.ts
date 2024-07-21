import NextAuth, { Session, DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null
    } & DefaultSession['user']
  }

  interface Profile {
    picture?: string | null
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }): Promise<Session> {
      // if (session.user && session.user.email) {
      //   const sessionUser = await User.findOne({
      //     email: session.user.email,
      //   })
      //   if (sessionUser) {
      //     session.user.id = sessionUser._id.toString()
      //   }
      // }

      return session
    },
    async signIn({ profile }) {
      try {
        // await connectToDB()

        // if (!profile || !profile.email) {
        //   return false
        // }
        // // check if user exists
        // const userExists = await User.findOne({
        //   email: profile.email,
        // })
        // create this user if it does not
        // if (!userExists) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name
        //       ? profile.name.replace(' ', '').toLowerCase()
        //       : '',
        //     image: profile.picture ?? '', // Assuming profile.picture is not available, use a fallback
        //   })
        // }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
