import { AddItemForm } from "@/components/inventory/add-item-form"
import { SiteHeader } from "@/components/site-header"

export default function AddItemPage() {
  return (
    <>
      <SiteHeader title="Add Item" href="/add" />
      <div className="flex flex-1 flex-col py-4 md:py-6">
        <AddItemForm />
      </div>
    </>
  )
}
