import { env } from "@/env.mjs"
import prisma from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_ID,
    }),
    DiscordProvider({
      clientId: env.DISCORD_ID,
      clientSecret: env.DISCORD_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
