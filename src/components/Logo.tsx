import Image from "next/image"
import { twMerge } from "tailwind-merge"

export function Logo({ className }: { className?: string }) {
  return (
    <div className="overflow-hidden">
      <Image
        src="/logo.svg"
        alt="DTU Archive"
        width={100}
        height={100}
        className={twMerge("scale-150 overflow-hidden", className)}
      />
    </div>
  )
}
