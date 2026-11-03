import type { Metadata } from "next";
import Link from "next/link";
import { Card, EmptyState, PageHeader, SampleBadge, UnavailableButton } from "@/components/ui/primitives";
import { shopCategories } from "@/lib/mock/sample-data";

export const metadata: Metadata = { title: "Shop" };

const tabs = [
  { id: "food", label: "Food" },
  { id: "clothes", label: "Clothes" },
  { id: "furniture", label: "Furniture" },
  { id: "inventory", label: "Inventory" },
  { id: "wardrobe", label: "Wardrobe" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function resolveTab(value: string | string[] | undefined): TabId {
  return tabs.find((tab) => tab.id === value)?.id ?? "food";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const { tab } = await searchParams;
  const active = resolveTab(tab);

  return (
    <>
      <PageHeader title="Shop" intro="Buy food, clothes and furniture, and manage what you own." />
      <nav aria-label="Shop sections" className="mb-5 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Link
            key={item.id}
            href={`/shop?tab=${item.id}`}
            aria-current={item.id === active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              item.id === active ? "bg-berry text-white" : "bg-white text-ink hover:bg-sand"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {active === "inventory" || active === "wardrobe" ? (
        <EmptyState title={active === "inventory" ? "Nothing owned yet" : "No clothes yet"}>
          Items you buy will appear here.
        </EmptyState>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {shopCategories[active].map((item) => (
            <Card key={item.id} title={item.name} badge={<SampleBadge />}>
              <p className="mb-3 text-sm text-muted">{item.price} coins</p>
              <UnavailableButton>Buy</UnavailableButton>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
