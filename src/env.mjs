import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DTUARCHIVE_MARIADB_USER: z.string().min(1),
    DTUARCHIVE_MARIADB_PASS: z.string().min(1),
    DTUARCHIVE_MARIADB_HOST: z.string().min(1),
    DTUARCHIVE_MARIADB_PORT: z.string().min(1),
    DTUARCHIVE_MARIADB_DB: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    DISCORD_ID: z.string().min(1),
    DISCORD_SECRET: z.string().min(1)
  },
  client: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1)
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    DTUARCHIVE_MARIADB_HOST: process.env.DTUARCHIVE_MARIADB_HOST,
    DTUARCHIVE_MARIADB_USER: process.env.DTUARCHIVE_MARIADB_USER,
    DTUARCHIVE_MARIADB_PASS: process.env.DTUARCHIVE_MARIADB_PASS,
    DTUARCHIVE_MARIADB_PORT: process.env.DTUARCHIVE_MARIADB_PORT,
    DTUARCHIVE_MARIADB_DB: process.env.DTUARCHIVE_MARIADB_DB,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    DISCORD_ID: process.env.DISCORD_ID,
    DISCORD_SECRET: process.env.DISCORD_SECRET
  }
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
})
