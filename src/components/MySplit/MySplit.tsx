import "./MySplit.css";
import Split from "react-split";

export function MySplit(props: {
  children: any;
  direction?: "vertical" | "horizontal";
  className?: string;
}) {
  return (
    // @ts-ignore
    <Split
      direction={props.direction ? props.direction : "horizontal"}
      className={props.className ? props.className : ""}
    >
      {props.children}
    </Split>
  );
}
