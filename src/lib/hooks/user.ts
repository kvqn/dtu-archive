import { useSession } from "next-auth/react"

export function useUser() {
  const session = useSession()
  if (!session.data) return null

  return session.data.user ?? null
}
