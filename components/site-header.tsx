import Link from "next/link"

import { SidebarTrigger } from "@/components/ui/sidebar"

type SiteHeaderProps = {
  title?: string
  href?: string
  showMobileLogo?: boolean
}

export function SiteHeader({
  title = "Inventory",
  href = "/inventory",
  showMobileLogo = false,
}: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div
          className="mx-2 h-4 w-px shrink-0 bg-border"
          aria-hidden="true"
        />
        <h1 className="flex items-center text-base font-medium leading-none">
          <Link href={href} className="inline-flex items-center gap-2 leading-none">
            {showMobileLogo ? (
              <img
                src="/FHLogo.png"
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0 self-center object-contain md:hidden"
                aria-hidden="true"
              />
            ) : null}
            <span className="leading-none">{title}</span>
          </Link>
        </h1>
      </div>
    </header>
  )
}
