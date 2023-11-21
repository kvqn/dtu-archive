import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import prisma from "@/prisma"
import Link from "next/link"

function displayType(type: string): string {
  if (type === "MID_TERM_QUESTIONS") return "Mid Term Questions"
  if (type === "END_TERM_QUESTIONS") return "End Term Questions"
  if (type === "MID_TERM_ANSWERS") return "Mid Term Answers"
  if (type === "END_TERM_ANSWERS") return "End Term Answers"
  else return ""
}
export default async function Page() {
  const PYQs = await prisma.pyq.findMany({
    include: {
      uploadedBy: true
    }
  })

  return (
    <>
      <Navbar left={[<NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />]} />
      <div
        style={{
          marginLeft: "20%",
          marginRight: "20%"
        }}
        className="mt-40"
      >
        {PYQs.map((pyq, index) => (
          <Link
            href={`/api/pyqs/${pyq.fileId}`}
            key={index}
            className="border flex justify-between p-4"
          >
            <div>
              <div className="flex gap-4">
                <div>{pyq.subject_code}</div>
                <div>{pyq.subject_name}</div>
              </div>
              <div>Uploaded by {pyq.uploadedBy.name}</div>
            </div>
            <div className="text-right">
              <div>{pyq.year}</div>
              <div> {displayType(pyq.type)} </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
