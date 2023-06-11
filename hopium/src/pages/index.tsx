import BigCard from "@/components/BigCard/BigCard"
import { Navbar } from "@/components/Navbar/Navbar"

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-around w-auto pt-20 h-4/6">
        <BigCard
          title="RESULTS"
          description="View semester and aggregate results for your batch and branch."
          href="/result"
        />
        <BigCard title="ARCHIVE" description="Filter notices scraped from the DTU website." href="#" />
      </div>
    </>
  )
}
