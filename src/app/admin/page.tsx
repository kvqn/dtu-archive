import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-6 pt-16">
      <div className="font-geologica text-4xl">Admin Console</div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/admin/edit-courses">
          <Button>Modify Course Information</Button>
        </Link>
        <Link href="/admin/files">
          <Button>Manage Files</Button>
        </Link>
        <Link href="/admin/tags">
          <Button>Manage Tags</Button>
        </Link>
      </div>
    </div>
  )
}
