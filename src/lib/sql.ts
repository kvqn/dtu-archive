import { env } from "@/env.mjs"
import { createConnection } from "mysql2"

const conn = createConnection({
  host: env.MIGRATIONS_HOST,
  user: env.MIGRATIONS_USER,
  password: env.MIGRATIONS_PASS,
  port: parseInt(env.MIGRATIONS_PORT as string),
  database: env.MIGRATIONS_DB,
})

conn.connect()

export default conn

export async function sql(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}
