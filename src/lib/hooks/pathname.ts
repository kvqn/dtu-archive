import { usePathname as _usePathname } from "next/navigation"

export function usePathname() {
  const pathname = _usePathname()
  return pathname ?? "/"
}
