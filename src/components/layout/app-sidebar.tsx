"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  IconLayoutDashboard,
  IconBarbell,
  IconApple,
  IconHeart,
  IconTarget,
  IconSun,
  IconMoon,
  IconActivity,
} from "@tabler/icons-react"
import { NavMain } from "@/components/layout/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navItems = [
  { title: "Dashboard", url: "/", icon: IconLayoutDashboard },
  { title: "Workouts", url: "/workouts", icon: IconBarbell },
  { title: "Nutrition", url: "/nutrition", icon: IconApple },
  { title: "Wellness", url: "/wellness", icon: IconHeart },
  { title: "Goals", url: "/goals", icon: IconTarget },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar variant="inset" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconActivity className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="font-heading truncate font-bold">
                  VitalTrack
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Health Tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <IconSun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
