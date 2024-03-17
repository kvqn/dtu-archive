"use client"

import "@theme-toggles/react/css/Around.css"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

import LoggedInStatus from "./LoggedInStatus"

function NavbarDtuarchive() {
  return NavbarItem({ name: "DTU Archive", href: "/" })
}

function NavbarDivider() {
  return <div className="">/</div>
}

function NavbarLeft(props: {
  children: React.ReactNode[]
  className?: string
}) {
  let { children, className } = props
  if (!className) className = ""
  return (
    <div className="flex items-center gap-1 lg:gap-4">
      <NavbarDtuarchive />
      <div className="hidden items-center gap-1 sm:flex">
        {children.map((child, index) => (
          <>
            <NavbarDivider />
            {child}
          </>
        ))}
      </div>
    </div>
  )
}

function NavbarRight(props: { children: React.ReactNode; className?: string }) {
  let { children, className } = props
  if (!className) className = ""
  return (
    <div className="flex items-center gap-4">
      {children}
      <LoggedInStatus />
    </div>
  )
}

function NavbarCenter(props: {
  children: React.ReactNode
  className?: string
}) {
  let { children, className } = props
  if (!className) className = ""
  return <div className="flex flex-grow">{children}</div>
}

function LinkOrDiv(props: {
  href?: string
  className?: string
  children: React.ReactNode
}) {
  let { href, className, children } = props
  if (!className) className = ""
  if (href)
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    )
  else return <div className={className}>{children}</div>
}

export function NavbarItem(props: {
  name: string
  className?: string
  active?: boolean
  href?: string
}) {
  let { name, className, active, href } = props
  if (!className) className = ""
  if (!active) active = false

  return (
    <LinkOrDiv
      className={twMerge(
        "relative mx-2 my-1 flex items-center justify-center border-b-2 border-white px-1 py-1 font-semibold transition-all hover:border-black",
        active && "border-gray-400",
        className
      )}
      href={href}
    >
      {name}
    </LinkOrDiv>
  )
}

export function Navbar(props: {
  left?: React.ReactNode[]
  center?: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  let { left, right, center, className } = props
  if (!left) left = []

  if (!className) className = ""
  return (
    <div
      className={twMerge(
        "flex w-full p-1 font-geist text-base sm:text-lg lg:text-xl",
        className
      )}
    >
      <NavbarLeft>{left}</NavbarLeft>
      <NavbarCenter>{center}</NavbarCenter>
      <NavbarRight>{right}</NavbarRight>
    </div>
  )
}
