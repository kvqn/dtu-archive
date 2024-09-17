"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

import styles from "./GradientLink.module.css"

type Props = {
  href: string
  name: string
  className?: string
}

export default function GradientLink(props: Props) {
  const { href, name, className } = props

  return (
    <Link
      className={cn(styles.link, className)}
      onMouseMove={(e) => {
        const x = ((e.clientX / innerWidth) * 100).toString()
        e.currentTarget.style.setProperty("--mouse-x", x + "%")
      }}
      href={href}
    >
      {name}
    </Link>
  )
}
