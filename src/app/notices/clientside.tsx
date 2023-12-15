"use client"

import { Input } from "@/components/Input"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Prisma } from "@prisma/client"
import { useEffect, useState } from "react"

function noticeType(type: Prisma.NoticeCreateInput["type"]) {
  if (type === "LATEST_NEWS") return "Latest News"
  if (type === "NOTICES") return "Notices"
  if (type === "TENDERS") return "Tenders"
  if (type === "FORTHCOMING_EVENTS") return "Forthcoming Events"
  if (type === "FIRST_YEAR_NOTICES") return "First Year Notices"
}

function diffDays(date: Date) {
  return Math.ceil((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) - 1
}

export function ClientSidePage(props: {
  notices: Prisma.NoticeGetPayload<{}>[]
}) {
  const notices = props.notices
  const [filteredNotices, setFilteredNotices] = useState(notices)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setFilteredNotices(
      notices.filter((notice) =>
        notice.title.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, notices])

  return (
    <div className="mx-[20%] flex flex-col gap-8">
      <h1 className="m-20 w-full text-center font-extrabold">NOTICES</h1>
      <Input
        placeholder="Search"
        left={<FontAwesomeIcon icon={faMagnifyingGlass} className="h-[30%]" />}
        className="h-16 text-lg"
        onChange={(e) => {
          setFilter(e.target.value)
        }}
      />
      {filteredNotices.map((notice, index) => (
        <a
          key={index}
          className="rounded-xl border p-4"
          href={notice.link}
          target="_blank"
        >
          <div className="font-bold">{notice.title}</div>
          <div className="flex justify-between text-sm">
            <div>{noticeType(notice.type)}</div>
            {notice.date ? (
              <div>
                {`${notice.date.getDate()}-${
                  notice.date.getMonth() + 1
                }-${notice.date.getFullYear()} (${diffDays(notice.date)} days)`}
              </div>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  )
}
