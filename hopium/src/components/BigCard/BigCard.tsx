import Link from "next/link"
import styles from "./BigCard.module.css"

type BigCardProps = {
  title: string
  description: string
  image?: string
  href?: string
  className?: string
}

export default function BigCard(props: BigCardProps) {
  let { title, description, image, href, className} = props
  if (!className) className = ""
  if (!href) href = "#"
  return (
    <Link className={styles.bigcard+' '+className} href={href}>
      <div className={styles.nothover}>
        <p>{title}</p>
      </div>

      <div className={styles.hover}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  )
}
