import CourseTableCount from "@/components/CourseTableCount/CourseTableCount"
import { NavbarItem } from "@/components/Navbar/Navbar"
import { Navbar } from "@/components/Navbar/Navbar"
import { getCoursesTableDataCount } from "@/lib/courses"
import { InferGetStaticPropsType } from "next"

export const getStaticProps = async () => {
  const courses_table_data = await getCoursesTableDataCount()
  return { props: { courses_table_data: courses_table_data } }
}

export default function Page({
  courses_table_data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Navbar
        center={<NavbarItem name="Courses (Count)" href="/courses/count" active={true}/>}
        right={<NavbarItem name="Courses (Percentile)" href="/courses" />}
      />
      <CourseTableCount courses={courses_table_data} />
    </>
  )
}
