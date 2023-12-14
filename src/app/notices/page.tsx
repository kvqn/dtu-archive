import { prisma } from "@/prisma"

import { RefreshButton } from "./RefreshButton"

export default async function Page() {
  const notices = await prisma.notice.findMany({})

  return (
    <div>
      <h1>Notices</h1>
      <RefreshButton />
      {notices.map((notice, index) => (
        <div key={index}>
          <h2>{notice.title}</h2>
          <p>{notice.link}</p>
          {notice.date ? <p>{notice.date.toString()}</p> : null}
        </div>
      ))}
    </div>
  )
}
