import CourseTable from "@/components/CourseTable/CourseTable"
import { NavbarItem } from "@/components/Navbar/Navbar"
import { Navbar } from "@/components/Navbar/Navbar"
import { getCoursesTableDataPercentiles } from "@/lib/courses"
import { InferGetStaticPropsType } from "next"
import Head from "next/head"

export const getStaticProps = async () => {
  const courses_table_data = await getCoursesTableDataPercentiles()
  return { props: { courses_table_data: courses_table_data } }
}

export default function Page({
  courses_table_data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Courses | DTU Archive</title>
      </Head>
      <Navbar
        center={
          <NavbarItem
            name="Courses (Percentile)"
            href="/courses"
            active={true}
          />
        }
        right={<NavbarItem name="Courses (Count)" href="/courses/count" />}
      />
      <CourseTable courses={courses_table_data} />
    </>
  )
}
