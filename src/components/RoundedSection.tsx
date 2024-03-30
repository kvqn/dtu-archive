import { cn } from "@/lib/utils"

export function RoundedSection({
  title,
  children,
  classNameContainer,
  classNameTitle,
}: {
  title?: string
  children: React.ReactNode
  classNameContainer?: string
  classNameTitle?: string
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border py-4",
        classNameContainer
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-white px-2 font-geist",
          classNameTitle
        )}
      >
        {title}
      </div>
      <div className="h-fit w-full px-2">{children}</div>
    </div>
  )
}
