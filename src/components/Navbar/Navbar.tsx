import Link from "next/link"

import styles from "./Navbar.module.css"

function NavbarDtuarchive() {
  return NavbarItem({ name: "DTU Archive", href: "/" })
}

function NavbarDivider() {
  return <>/</>
}

function NavbarLeft(props: { children: React.ReactNode[]; className?: string }) {
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

function NavbarRight(props: { children: React.ReactNode; className?: string }) {
  let { children, className } = props
  if (!className) className = ""
  return <div className={styles.navbarright + " " + className}>{children}</div>
}

function NavbarCenter(props: { children: React.ReactNode; className?: string }) {
  let { children, className } = props
  if (!className) className = ""
  return <div className={styles.navbarcenter + " " + className}>{children}</div>
}

export function NavbarItem(props: { name: string; className?: string; active?: boolean; href?: string }) {
  let { name, className, active, href } = props
  if (!className) className = ""
  if (!active) active = false
  if (active) className = className + " " + styles.active
  if (!href) return <div className={styles.navbaritem + " " + className}>{name}</div>
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
