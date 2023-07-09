import CourseTable from "@/components/CourseTable/CourseTable"
import { NavbarItem } from "@/components/Navbar/Navbar"
import { Navbar } from "@/components/Navbar/Navbar"
import { getCoursesTableDataPercentiles } from "@/lib/courses"
import { InferGetStaticPropsType } from "next"

export const getStaticProps = async () => {
  const courses_table_data = await getCoursesTableDataPercentiles()
  return { props: { courses_table_data: courses_table_data } }
}

export default function Page({
  courses_table_data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Navbar
        center={<NavbarItem name="Courses (Percentile)" href="/courses" active={true}/>}
        right={<NavbarItem name="Courses (Count)" href="/courses/count" />}
      />
      <CourseTable courses={courses_table_data} />
    </>
  )
}
