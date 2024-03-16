"use server";

import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { JSDOM } from "jsdom";
import posthog from "posthog-js";

type Notice = Prisma.NoticeCreateInput;

export async function scrapeNotices() {
  console.log("Scraping notices");
  const resp = await axios.get("http://www.dtu.ac.in");
  const dom = new JSDOM(resp.data);
  const doc = dom.window.document;

  const notices: Notice[] = [];

  const tabs: [any, Element | null][] = [];
  tabs.push(["LATEST_NEWS" as const, doc.querySelector("div#tab4")]);
  tabs.push(["NOTICES" as const, doc.querySelector("div#tab1")]);
  tabs.push(["JOBS" as const, doc.querySelector("div#tab2")]);
  tabs.push(["TENDERS" as const, doc.querySelector("div#tab3")]);
  tabs.push(["FORTHCOMING_EVENTS" as const, doc.querySelector("div#tab5")]);
  tabs.push(["FIRST_YEAR_NOTICES" as const, doc.querySelector("div#tab8")]);

  for (const [notice_type, tab] of tabs) {
    if (!tab) {
      console.log(`${notice_type} tab not found`);
      continue;
    }

    const latestTab = tab.querySelector("div.latest_tab");
    if (!latestTab) {
      console.log("latestTab not found");
      return;
    }

    const latestTabNotices = latestTab.querySelectorAll("li");

    latestTabNotices.forEach((notice) => {
      // console.log(notice.textContent)
      const anchors = notice.querySelectorAll("a");

      let commonTitle = "";
      anchors.forEach((anchor) => {
        if (!anchor.href) {
          commonTitle = anchor.textContent as string;
          return;
        }
        let link = anchor.href;
        if (link.startsWith(".")) link = link.slice(1);
        link = "http://www.dtu.ac.in" + link;

        const title = anchor.textContent as string;
        if (
          link ==
            "http://www.dtu.ac.inhttp://www.dtu.ac.in/Web/Archive/archive-latest-news.php" ||
          link == "http://www.dtu.ac.injavascript:void(0);"
        )
          return;
        const dateString = notice
          .querySelector("em")
          ?.querySelector("i")?.textContent;

        let date = null;
        if (dateString) {
          const dateStringSplit = dateString.split(".");
          try {
            date = new Date(
              `${dateStringSplit[2].trim()}-${dateStringSplit[1].trim()}-${dateStringSplit[0].trim()}`
            ).toISOString();
          } catch (e) {
            console.log(e);
          }
        }

        notices.push({
          title: (commonTitle ? `${commonTitle} (${title})` : title).replace(
            /[^\x00-\x7F]/g,
            ""
          ),
          link: link,
          type: notice_type,
          date: date,
        });
      });
    });
  }

  const oldNotices = await prisma.notice.findMany({});

  const newNotices = notices.filter((notice) => {
    return !oldNotices.some((oldNotice) => {
      return oldNotice.link == notice.link;
    });
  });

  await prisma.notice.createMany({
    data: newNotices,
  });

  // await prisma.notice.create({
  //   data: {
  //     title: "Test",
  //     link: "http://www.dtu.ac.in",
  //     type: "NOTICES",
  //     date: null,
  //   },
  // })

  const log = {
    oldNotices: oldNotices.length,
    newNotices: newNotices.length,
  };

  posthog.capture("Scrape Notices", log);

  return log;
}
