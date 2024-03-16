"use client";

import { Around } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function ThemeToggle() {
  let [isToggled, setIsToggled] = useState(false);
  let { setTheme } = useTheme();

  const onToggle = () => {
    if (isToggled) setTheme("light");
    else setTheme("dark");
  };
  return (
    <Around
      duration={750}
      style={{ transform: "scale(2)" }}
      toggled={isToggled}
      toggle={setIsToggled}
      onToggle={onToggle}
    />
  );
}
