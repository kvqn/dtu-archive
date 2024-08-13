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
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Settings } from "./settings"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function Navbar() {
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
        <Button variant={"outline"}>Login</Button>
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
