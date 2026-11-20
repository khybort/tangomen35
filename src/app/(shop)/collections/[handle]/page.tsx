import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getCollection, getCollectionProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { SortSelect } from "@/components/sort-select";

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const c = getCollection((await params).handle);
  return c ? { title: c.title, description: c.tagline } : {};
}

const SORTS: Record<string, (a: { price: number; title: string }, b: { price: number; title: string }) => number> = {
  "fiyat-artan": (a, b) => a.price - b.price,
  "fiyat-azalan": (a, b) => b.price - a.price,
  "a-z": (a, b) => a.title.localeCompare(b.title, "tr"),
};

export default async function CollectionPage({ params, searchParams }: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const { sort } = await searchParams;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const sorter = typeof sort === "string" ? SORTS[sort] : undefined;
  const items = sorter ? [...getCollectionProducts(handle)].sort(sorter) : getCollectionProducts(handle);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-14 sm:px-10">
      <h1 className="heading text-5xl sm:text-6xl">{collection.title}</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed">
        <b className="font-semibold">Dansçılar için tasarlandı. Pist için dikildi.</b>
        <br />
        {collection.tagline}
      </p>

      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto">
        {collections.map((c) => (
          <Link
            key={c.handle}
            href={`/collections/${c.handle}`}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs tracking-wide ${
              c.handle === handle ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
            }`}
          >
            {c.title}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-b border-line pb-4 text-xs text-muted">
        <span>{items.length} ürün</span>
        <SortSelect value={typeof sort === "string" ? sort : ""} />
      </div>

      {items.length === 0 ? (
        <p className="py-24 text-center text-sm text-muted">Bu koleksiyonda henüz ürün yok.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p, i) => (
            <ProductCard key={p.handle} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
