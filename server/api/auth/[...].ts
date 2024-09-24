import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET ?? 'mi-grato-secreto',
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials: any) {
        const user = {
          username: credentials?.username,
        }

        const { status } = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userCode: credentials?.username,
            password: credentials?.password,
          }),
        })

        return status === 200 ? user : null
      },
    }),
  ],
})
