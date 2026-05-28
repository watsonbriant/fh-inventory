"use client"

import { usePathname } from "next/navigation"

export function PageTransition({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-enter flex min-h-full flex-1 flex-col">
      {children}
    </div>
  )
}
