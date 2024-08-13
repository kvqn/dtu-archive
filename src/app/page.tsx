import Link from "next/link"

export default function Page() {
  return (
    <div className="flex h-full select-none flex-col lg:flex-row">
      <div className="m-4 flex flex-grow basis-0 flex-col items-center justify-center gap-8 rounded-xl border bg-neutral-100 dark:bg-neutral-950 lg:m-8">
        <h1 className="text-center font-permanent-marker text-6xl">
          DTU ARCHIVE
        </h1>
        <h2 className="text-center text-2xl text-neutral-500">
          A stupid side project.
        </h2>
      </div>
      <div className="flex h-full flex-grow basis-0 flex-col justify-center">
        <Card href="/student" title="Student Wise Result" />
        <Card href="/result" title="Branch Wise Result" />
        <Card href="/aggregate" title="All Branches Aggregate Result" />
      </div>
    </div>
  )
}

function Card({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="m-4 flex flex-grow items-center justify-center rounded-xl border p-8 text-center text-2xl font-semibold transition-colors hover:bg-neutral-100 hover:dark:bg-neutral-900 lg:m-8"
    >
      {title}
    </Link>
  )
}
