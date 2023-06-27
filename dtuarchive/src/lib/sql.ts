import { createConnection } from "mysql"

const conn = createConnection({
  host: process.env.DTUARCHIVE_MARIADB_HOST,
  user: process.env.DTUARCHIVE_MARIADB_USER,
  password: process.env.DTUARCHIVE_MARIADB_PASS,
  port: parseInt(process.env.DTUARCHIVE_MARIADB_PORT as string),
  database: process.env.DTUARCHIVE_MARIADB_DB
})

conn.connect()

export default conn

export type ResultHeirarchy = {
  result: string
  heirarchy: string
  semester: number
}

export type ResultStudentDetails = {
  result: string
  rollno: string
  name: string
  tc: number
  cgpa: number
  failed_subjects: string
  bad: boolean
}

export type ResultGrades = {
  result: string
  rollno: string
  subject: string
  grade: string
}
