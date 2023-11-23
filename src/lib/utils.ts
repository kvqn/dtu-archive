import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useServerSession() {
  return getServerSession(authOptions)
}
