"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Switch } from "./ui/switch"

export function Settings() {
  const { theme, setTheme } = useTheme()

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
          <div className="flex items-center gap-2 p-2">
            <Switch
              checked={theme == "dark"}
              onCheckedChange={(checked) => {
                setTheme(checked ? "dark" : "light")
              }}
            />
            <label>Dark Mode</label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
