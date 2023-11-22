import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { useServerSession } from "@/lib/utils"
import prisma from "@/prisma"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import { useSession } from "next-auth/react"
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

  const session = await useServerSession()
  const show_upload = await isAllowedToUpload(session)

  return (
    <>
      <Navbar left={[<NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />]} />
      <div className="flex justify-end">
        {show_upload && (
          <Link
            href="/pyqs/upload"
            className="mx-8 my-4 px-3 py-2 text-xl border rounded-xl bg-green-300 hover:bg-green-400 transition-colors cursor-pointer"
          >
            Upload
          </Link>
        )}
      </div>
      <div
        style={{
          marginLeft: "20%",
          marginRight: "20%"
        }}
        className="mt-40"
      >
        {PYQs.map((pyq, index) => (
          <Link
            href={`/api/pyq/${pyq.fileId}`}
            target="_blank"
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
