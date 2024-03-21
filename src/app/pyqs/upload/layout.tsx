"use client"

import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar
        left={[
          <NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />,
          <NavbarItem name="Upload" href="/pyqs/upload" key="upload" />,
        ]}
      />
      {children}
    </>
  )
}
