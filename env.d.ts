declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DTUARCHIVE_MARIADB_HOST: string
      DTUARCHIVE_MARIADB_USER: string
      DTUARCHIVE_MARIADB_PASS: string
      DTUARCHIVE_MARIADB_PORT: string
      DTUARCHIVE_MARIADB_DB: string
      NEXT_PUBLIC_GA_MEASUREMENT_ID: string
      GITHUB_ID: string
      GITHUB_SECRET: string
    }
  }
}
