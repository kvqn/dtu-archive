import Link from "next/link"

import styles from "./GradientLink.module.css"

type Props = {
  href: string
  name: string
  className?: string
}

export default function GradientLink(props: Props) {
  let { href, name, className } = props

  if (!className) className = ""

  const onMouseMove = (e: any) => {
    let x = ((e.clientX / innerWidth) * 100).toString()
    e.currentTarget.style.setProperty("--mouse-x", x + "%")
  }

  return (
    <Link
      className={styles.link + " " + className}
      onMouseMove={onMouseMove}
      href={href}
    >
      {name}
    </Link>
  )
}
