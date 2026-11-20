import type { Metadata } from "next";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = { title: "Arama" };

const norm = (s: string) => s.toLocaleLowerCase("tr");

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const results = query
    ? products.filter((p) => norm(`${p.title} ${p.color} ${p.description}`).includes(norm(query)))
    : [];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-14 sm:px-10">
      <h1 className="heading text-5xl">Arama</h1>
      <form className="mt-8 max-w-xl">
        <input name="q" defaultValue={query} placeholder="Ürün ara…" className="field" />
      </form>
      {query && (
        <p className="mt-6 text-sm text-muted">
          “{query}” için {results.length} sonuç
        </p>
      )}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {results.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </div>
  );
}
