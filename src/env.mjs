import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    OTHER_DATABASE_URL: z.string().url(),
    MIGRATIONS_USER: z.string().min(1),
    MIGRATIONS_PASS: z.string().min(1),
    MIGRATIONS_HOST: z.string().min(1),
    MIGRATIONS_PORT: z.string().min(1),
    MIGRATIONS_DB: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string(),
    DISCORD_ID: z.string(),
    DISCORD_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    OTHER_DATABASE_URL: process.env.OTHER_DATABASE_URL,
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    MIGRATIONS_USER: process.env.MIGRATIONS_USER,
    MIGRATIONS_PASS: process.env.MIGRATIONS_PASS,
    MIGRATIONS_HOST: process.env.MIGRATIONS_HOST,
    MIGRATIONS_PORT: process.env.MIGRATIONS_PORT,
    MIGRATIONS_DB: process.env.MIGRATIONS_DB,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_ID: process.env.DISCORD_ID,
    DISCORD_SECRET: process.env.DISCORD_SECRET,
  },
})
