import CourseTableCount from "@/components/CourseTableCount/CourseTableCount"
import { NavbarItem } from "@/components/Navbar/Navbar"
import { Navbar } from "@/components/Navbar/Navbar"
import { getCoursesTableDataCount } from "@/lib/courses"
import { InferGetStaticPropsType } from "next"
import Head from "next/head"

export const getStaticProps = async () => {
  const courses_table_data = await getCoursesTableDataCount()
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
        left={
        [
        <NavbarItem
        name="Courses (Count)"
        href="/courses/count"
        active={true}
        key="courses"
        />
        ]
        }
        right={<NavbarItem name="Courses (Percentile)" href="/courses" />}
      />
      <CourseTableCount courses={courses_table_data} />
    </>
  )
}
