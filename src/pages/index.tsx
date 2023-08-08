import BigCard from "@/components/BigCard/BigCard"
import { Navbar } from "@/components/Navbar/Navbar"
import SexyText from "@/components/SexyText/SexyText"
import conn from "@/lib/sql"
import { InferGetStaticPropsType } from "next"
import Head from "next/head"

async function studentCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    conn.query(
      "select count(distinct ifnull(rollnos.new, result_student_details.rollno)) as count from result_student_details left join rollnos on result_student_details.rollno = rollnos.old",
      (err, result) => {
        if (err) reject(err)
        resolve(result[0]["count"])
      }
    )
  })
}

async function gradeCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    conn.query("select count(*) as count from result_grades", (err, result) => {
      if (err) reject(err)
      resolve(result[0]["count"])
    })
  })
}

export async function getStaticProps() {
  const student_count = await studentCount()
  const grade_count = await gradeCount()
  return {
    props: {
      student_count,
      grade_count
    }
  }
}

export default function Page({ student_count, grade_count }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>DTU Archive</title>
      </Head>

      <Navbar />

      <div className="text-center mt-16 text-5xl font-inter font-extrabold">
        I scraped results for {student_count} students,
      </div>
      <div className="text-center mt-8 text-4xl font-inter font-extrabold">
        providing you{" "}
        <span className="text-6xl">
          <SexyText text={grade_count} />
        </span>{" "}
        data points ready for analysis.
      </div>

      <div className="flex flex-row items-center justify-around w-auto pt-20 h-1/2 mx-32">
        <BigCard
          title="RESULTS"
          description="View semester and aggregate results for your batch and branch."
          href="/result"
        />
        <BigCard
          title="COURSES"
          description="View details and grades for each course in your curriculum."
          href="/courses"
        />
        <BigCard
          title="STUDENTS"
          description="View details and grades for each course in your curriculum."
          href="/students"
        />
      </div>
    </>
  )
}
