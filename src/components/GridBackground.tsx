import React from "react"

export function BigGridBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl">
        <div className="text-black">{children}</div>
      </p>
    </div>
  )
}

export function SmallGridBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl">
        <div className="text-black">{children}</div>
      </p>
    </div>
  )
}
