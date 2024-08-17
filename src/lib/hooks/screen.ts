import { useMediaQuery } from "react-responsive"

export function useScreen() {
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" })
  const isMedium = useMediaQuery({ query: "(max-width: 768px)" })
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" })
  const isXLarge = useMediaQuery({ query: "(min-width: 1280px)" })
  const isXXLarge = useMediaQuery({ query: "(min-width: 1536px)" })

  return { isSmall, isMedium, isLarge, isXLarge, isXXLarge }
}
