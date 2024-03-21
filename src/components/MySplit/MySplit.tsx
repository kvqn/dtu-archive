import Split from "react-split"

import "./MySplit.css"

export function MySplit(props: {
  children: any
  direction?: "vertical" | "horizontal"
  className?: string
}) {
  return (
    // @ts-ignore
    <Split
      direction={props.direction ? props.direction : "horizontal"}
      className={props.className ? props.className : ""}
    >
      {props.children}
    </Split>
  )
}
