"use client"

import { ClientSideOnly } from "@/lib/utils"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Around } from "@theme-toggles/react"
import "@theme-toggles/react/css/Around.css"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState } from "react"

import styles from "./Navbar.module.css"

function NavbarDtuarchive() {
  return NavbarItem({ name: "DTU Archive", href: "/" })
}

function NavbarDivider() {
  return <div className={styles.navbardivider}> / </div>
}

function NavbarLeft(props: {
  children: React.ReactNode[]
  className?: string
}) {
  let { children, className } = props
  if (!className) className = ""
  return (
    <div className={styles.navbarleft + " " + className}>
      <NavbarDtuarchive />
      {children.map((child, index) => (
        <div key={index}>
          <NavbarDivider />
          {child}
        </div>
      ))}
    </div>
  )
}

function ThemeToggle() {
  let [isToggled, setIsToggled] = useState(false)
  let { setTheme } = useTheme()

  const onToggle = () => {
    if (isToggled) setTheme("light")
    else setTheme("dark")
  }
  return (
    <Around
      duration={750}
      style={{ transform: "scale(2)" }}
      toggled={isToggled}
      toggle={setIsToggled}
      onToggle={onToggle}
    />
  )
}

function GithubIcon() {
  const { theme } = useTheme()

  if (theme === "dark")
    return (
      <Link
        href="https://github.com/kvqn/dtu-archive"
        className="hover:scale-125 transition-transform"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2xl"
          style={{ color: "#FFFFFF" }}
        />
      </Link>
    )
  else
    return (
      <Link
        href="https://github.com/kvqn/dtu-archive"
        className="hover:scale-125 transition-transform"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2xl"
          style={{ color: "#000000" }}
        />
      </Link>
    )
}

function NavbarRight(props: { children: React.ReactNode; className?: string }) {
  let { children, className } = props
  if (!className) className = ""
  return (
    <div className={styles.navbarright + " " + className}>
      {children}
      <ThemeToggle />
      <ClientSideOnly>
        <GithubIcon />
      </ClientSideOnly>
    </div>
  )
}

function NavbarCenter(props: {
  children: React.ReactNode
  className?: string
}) {
  let { children, className } = props
  if (!className) className = ""
  return <div className={styles.navbarcenter + " " + className}>{children}</div>
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
  if (active) className = className + " " + styles.active
  if (!href)
    return <div className={styles.navbaritem + " " + className}>{name}</div>
  else
    return (
      <Link href={href} className={styles.navbaritem + " " + className}>
        {name}
      </Link>
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
    <>
      <div className={styles.navbar + " " + className}>
        <NavbarLeft>{left}</NavbarLeft>
        <NavbarCenter>{center}</NavbarCenter>
        <NavbarRight>{right}</NavbarRight>
      </div>
    </>
  )
}
