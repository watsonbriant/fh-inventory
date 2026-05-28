import { AppSidebar } from "@/components/app-sidebar"
import { AddItemForm } from "@/components/inventory/add-item-form"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AddItemPage() {
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
        <SiteHeader title="Add Item" href="/add" />
        <div className="flex flex-1 flex-col py-4 md:py-6">
          <AddItemForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
