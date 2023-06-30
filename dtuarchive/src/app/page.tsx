import BigCard from "@/components/BigCard/BigCard"
import { Navbar } from "@/components/Navbar/Navbar"
import SexyText from "@/components/SexyText/SexyText"
import conn from "@/lib/sql"


export default async function Page() {
  return (
    <>
      <Navbar />

      <div className="text-black text-center mt-16 text-5xl font-inter">
        I scraped results for {await studentCount()} students,
      </div>
      <div className="text-black text-center mt-8 text-4xl font-inter">
        providing you <span className="text-6xl"><SexyText text={await gradeCount()}/></span> data points ready for analysis.
      </div>

      <div className="flex flex-col items-center justify-around w-auto pt-20 h-1/2">
        <BigCard
          title="RESULTS"
          description="View semester and aggregate results for your batch and branch."
          href="/result"
        />
        <BigCard
          title="ARCHIVE"
          description="Filter notices scraped from the DTU website."
          href="#"
        />
      </div>
    </>
  )
}

async function resultCount() : Promise<number> {
  return new Promise((resolve, reject) => {
    conn.query(
      "select count(*) as count from result_heirarchy",
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]["count"]);
      }
  )})
}

async function studentCount() : Promise<number> {
  return new Promise((resolve, reject) => {
    conn.query(
      "select count(distinct ifnull(rollnos.new, result_student_details.rollno)) as count from result_student_details left join rollnos on result_student_details.rollno = rollnos.old",
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]["count"]);
      }
  )})
}

async function gradeCount() : Promise<number> {
  return new Promise((resolve, reject) => {
    conn.query(
      "select count(*) as count from result_grades",
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]["count"]);
      }
  )})
}
