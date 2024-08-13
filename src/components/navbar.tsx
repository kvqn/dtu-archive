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
import { useUser } from "@/lib/hooks/user"
import { isAdmin } from "@/server/actions/isAdmin"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Settings } from "./settings"
import { Separator } from "./ui/separator"

export function Navbar() {
  const [admin, setAdmin] = useState(false)
  const user = useUser()

  useEffect(() => {
    isAdmin().then(setAdmin)
  }, [])

  return (
    <>
      <div className="flex items-center gap-2 p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <ChevronRightIcon />
            <NavigationMenuItem>
              <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-80 flex-col gap-2 p-2">
                  <NavLink
                    href="/result"
                    title="Branch-Wise Result"
                    description="Compare yourself to your batchmates"
                  />
                  <NavLink
                    href="/student"
                    title="Student-Wise Result"
                    description="See your grades accross all semesters"
                  />
                  <NavLink
                    href="/aggregate"
                    title="All Branches Aggregate Result"
                    description="See where you rank in the university"
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {admin && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/admin"
                >
                  Admin Page
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-grow"></div>
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
