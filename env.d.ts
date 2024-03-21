declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MARIADB_HOST: string
      MARIADB_USER: string
      MARIADB_PASS: string
      MARIADB_PORT: string
      MARIADB_DB: string
      NEXT_PUBLIC_GA_MEASUREMENT_ID: string
      GITHUB_ID: string
      GITHUB_SECRET: string
    }
  }
}
