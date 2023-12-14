"use client"

import { scrapeNotices } from "@/server/scrapeNotices"

export function RefreshButton() {
  async function _scrapeNotices() {
    "server only"
    await scrapeNotices()
  }
  return <button onClick={_scrapeNotices}>Scrape Notices</button>
}
