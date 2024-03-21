import styles from "./SexyText.module.css"

export default function SexyText({ text }: { text: string | number }) {
  return <span className={styles.sexytext}>{text}</span>
}
