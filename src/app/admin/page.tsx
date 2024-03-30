import Link from "next/link"

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="font-geologica text-4xl">Admin Console</div>
      <div className="flex">
        <Link
          className="rounded-xl border border-blue-600 bg-blue-100 p-4 hover:bg-blue-200"
          href="/admin/edit-courses"
        >
          Modify Course Information
        </Link>
      </div>
    </div>
  )
}
