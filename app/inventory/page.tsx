import { AppSidebar } from "@/components/app-sidebar"
import { InvItemsTable } from "@/components/inventory/inv-items-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getInvItems } from "@/lib/inventory/get-inv-items"

export const dynamic = "force-dynamic"

export default async function InventoryPage() {
  const items = await getInvItems()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Inventory" href="/inventory" showMobileLogo />
        <div className="flex flex-1 flex-col py-4 md:py-6">
          <InvItemsTable data={items} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
