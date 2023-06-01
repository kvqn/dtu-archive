import Link from "next/link"

import styles from "./GradientLink.module.css"

type Props = {
  href: string
  name: string
}

export default function GradientLink(props: Props) {
  const { href, name } = props

  const onMouseMove = (e: any) => {
    let x = ((e.clientX / innerWidth) * 100).toString()
    e.currentTarget.style.setProperty("--mouse-x", x + "%")
  }

  return (
    <Link className={styles.link} onMouseMove={onMouseMove} href={href}>
      {name}
    </Link>
  )
}
