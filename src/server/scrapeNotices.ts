"use server"

import { prisma } from "@/prisma"
import { Prisma } from "@prisma/client"
import axios from "axios"
import { JSDOM } from "jsdom"
import posthog from "posthog-js"

type Notice = Prisma.NoticeCreateInput

export async function scrapeNotices() {
  console.log("Scraping notices")
  const resp = await axios.get("http://www.dtu.ac.in")
  const dom = new JSDOM(resp.data)
  const doc = dom.window.document

  const latestTab = doc.querySelector("div.latest_tab")
  if (!latestTab) {
    console.log("latestTab not found")
    return
  }

  const latestTabNotices = latestTab.querySelectorAll("li")

  const notices: Notice[] = []
  latestTabNotices.forEach((notice) => {
    // console.log(notice.textContent)
    const anchors = notice.querySelectorAll("a")

    let commonTitle = ""
    anchors.forEach((anchor) => {
      if (!anchor.href) {
        commonTitle = anchor.textContent as string
        return
      }
      let link = anchor.href
      if (link.startsWith(".")) link = link.slice(1)
      link = "http://www.dtu.ac.in" + link

      const title = anchor.textContent as string
      if (
        link ==
          "http://www.dtu.ac.inhttp://www.dtu.ac.in/Web/Archive/archive-latest-news.php" ||
        link == "http://www.dtu.ac.injavascript:void(0);"
      )
        return
      const dateString = notice
        .querySelector("em")
        ?.querySelector("i")?.textContent

      let date
      if (dateString) {
        const dateStringSplit = dateString.split(".")
        date = new Date(
          `${dateStringSplit[2]}-${dateStringSplit[1]}-${dateStringSplit[0]}`
        )
      }
      console.log(dateString, date)

      notices.push({
        title: commonTitle ? `${commonTitle} (${title})` : title,
        link: link,
        type: "LATEST_NEWS",
        date: date,
      })
    })
  })

  const oldNotices = await prisma.notice.findMany({})

  const newNotices = notices.filter((notice) => {
    return !oldNotices.some((oldNotice) => {
      return oldNotice.link == notice.link
    })
  })

  await prisma.notice.createMany({
    data: newNotices,
  })

  const log = {
    oldNotices: oldNotices.length,
    newNotices: newNotices.length,
  }

  posthog.capture("Scrape Notices", log)

  return log
}
