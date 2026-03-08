"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/workouts": "Workouts",
  "/nutrition": "Nutrition",
  "/wellness": "Wellness",
  "/goals": "Goals",
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Dashboard"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=offcanvas]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-heading text-lg font-semibold">{title}</h1>
      </div>
    </header>
  )
}
