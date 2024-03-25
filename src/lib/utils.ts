import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function zip<T1, T2>(a: Iterable<T1>, b: Iterable<T2>) {
  const a_arr = Array.from(a)
  const b_arr = Array.from(b)
  return a_arr.map((v, i) => [v, b_arr[i]] as [T1, T2])
}

export function gradeValue(grade: string) {
  switch (grade) {
    case "O":
      return 10
    case "A+":
      return 9
    case "A":
      return 8
    case "B+":
      return 7
    case "B":
      return 6
    case "C":
      return 5
    case "P":
      return 4
    case "F":
      return 0
    default:
      return 0
  }
}
