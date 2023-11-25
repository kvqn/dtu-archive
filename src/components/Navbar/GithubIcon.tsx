"use client "

import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function GithubIcon() {
  const { theme } = useTheme()

  if (theme === "dark")
    return (
      <Link
        href="https://github.com/kvqn/dtu-archive"
        className="transition-transform hover:scale-125"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2xl"
          style={{ color: "#FFFFFF" }}
        />
      </Link>
    )
  else
    return (
      <Link
        href="https://github.com/kvqn/dtu-archive"
        className="transition-transform hover:scale-125"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2xl"
          style={{ color: "#000000" }}
        />
      </Link>
    )
}
