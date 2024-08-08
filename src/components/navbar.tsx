"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "@/lib/hooks/pathname"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Settings } from "./settings"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <div className="flex items-center gap-2 p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <ChevronRightIcon />
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {pathname.startsWith("/result")
                  ? "Branch-Wise Result"
                  : pathname.startsWith("/courses")
                  ? "Course-Wise Result"
                  : pathname.startsWith("/student")
                  ? "Student-Wise Result"
                  : "Browse"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-80 flex-col gap-2 p-2">
                  <NavLink
                    href="/result"
                    title="Branch-Wise Result"
                    description="Compare yourself to your batchmates"
                  />
                  <NavLink
                    href="/result"
                    title="Student-Wise Result"
                    description="See your grades accross all semesters"
                  />
                  <NavLink
                    href="/courses"
                    title="Course-Wise Result"
                    description="Compare courses and their grades"
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-grow"></div>
        <Button>Login</Button>
        <Settings />
      </div>
      <Separator />
    </>
  )
}

function NavLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description?: string
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-md p-2 text-sm transition-colors hover:bg-muted"
    >
      <p className="font-semibold">{title}</p>
      {description && <p>{description}</p>}
    </Link>
  )
}
