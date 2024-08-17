"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUser } from "@/lib/hooks/user"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { signIn, signOut } from "next-auth/react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import { Switch } from "../../components/ui/switch"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const user = useUser()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="p-2">
          <HamburgerMenuIcon width={"1.5rem"} height="1.5rem" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-2 flex flex-col p-2">
        <h1 className="p-2 text-center text-lg font-bold">Settings</h1>
        <Separator />
        <div className="p-2">
          <h2 className="font-semibold">Theme</h2>
          <div className="flex items-center gap-4 p-2">
            <Switch
              checked={theme == "dark"}
              onCheckedChange={(checked) => {
                setTheme(checked ? "dark" : "light")
              }}
            />
            <label>Dark Mode</label>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2 p-2">
          <h2 className="font-semibold">User</h2>
          {user ? (
            <div className="flex items-center gap-4 rounded-md border bg-neutral-100 px-2 py-1 dark:bg-neutral-900">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              {user.name}
            </div>
          ) : (
            <p>Not logged in</p>
          )}
          <Button
            variant={user ? "destructive" : "outline"}
            onClick={() => {
              if (!user) {
                signIn()
              } else {
                signOut()
              }
            }}
          >
            {user ? "Log out" : "Login"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
