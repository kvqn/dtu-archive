import Image from "next/image"
import { twMerge } from "tailwind-merge"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={twMerge("h-[100px] w-[100px] overflow-hidden", className)}>
      <img
        src="/logo.svg"
        alt="DTU Archive"
        className="h-full w-full"
        style={{
          scale: "200%",
        }}
      />
    </div>
  )
}
