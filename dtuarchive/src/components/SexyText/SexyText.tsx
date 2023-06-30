import "./SexyText.css"

export default function SexyText({ text }: { text: string | number }) {
  return <span className="font-rowdies sexy-text">{text}</span>
}
