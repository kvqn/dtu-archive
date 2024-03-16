import styles from "./BigCard.module.css";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type BigCardProps = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  className?: string;
};

export default function BigCard(props: BigCardProps) {
  let { title, description, image, href, className } = props;
  if (!className) className = "";
  if (!href) href = "#";
  return (
    <Link className={twMerge(styles.bigcard, className)} href={href}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </Link>
  );
}
