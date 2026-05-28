import { InvItemsTable } from "@/components/inventory/inv-items-table"
import { SiteHeader } from "@/components/site-header"
import { getInvItems } from "@/lib/inventory/get-inv-items"

export const dynamic = "force-dynamic"

export default async function InventoryPage() {
  const items = await getInvItems()

  return (
    <>
      <SiteHeader title="Inventory" href="/inventory" showMobileLogo />
      <div className="flex flex-1 flex-col py-4 md:py-6">
        <InvItemsTable data={items} />
      </div>
    </>
  )
}
