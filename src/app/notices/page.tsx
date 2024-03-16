import { RefreshButton } from "./RefreshButton";
import { ClientSidePage } from "./clientside";
import { Navbar } from "@/components/Navbar/Navbar";
import { prisma } from "@/prisma";

export default async function Page() {
  const notices = await prisma.notice.findMany({ orderBy: { date: "desc" } });

  return (
    <>
      <Navbar />
      <RefreshButton />
      <ClientSidePage notices={notices} />
    </>
  );
}
