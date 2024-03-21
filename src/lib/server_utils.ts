import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export function useServerSession() {
  return getServerSession(authOptions)
}
