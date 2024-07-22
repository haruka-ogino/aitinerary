import NextAuth, { Session, DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { pool } from '@utils/database'

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null
    } & DefaultSession['user']
  }

  interface Profile {
    picture?: string | null
    given_name: string
    family_name: string
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
      if (session.user && session.user.email) {
        try {
          const result = await pool.query(
            'SELECT id FROM person WHERE email = $1',
            [session.user.email]
          )
          if (result.rows.length > 0) {
            session.user.id = result.rows[0].id.toString()
          }
        } catch (error) {
          console.error('Error fetching user ID', error)
        }
      }

      return session
    },
    async signIn({ profile }) {
      try {
        if (profile?.email) {
          const result = await pool.query(
            'SELECT * FROM person WHERE email = $1',
            [profile.email]
          )
          if (result.rows.length === 0) {
            // Insert the new user if they don't exist
            await pool.query(
              'INSERT INTO person (id, email, given_name, family_name, picture) VALUES ($1, $2, $3, $4,$5)',
              [
                profile.sub,
                profile.email,
                profile.given_name,
                profile.family_name,
                profile.picture,
              ]
            )
          }
        }

        return true
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
        // return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
