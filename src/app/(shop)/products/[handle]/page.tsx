import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ruler, Scissors, Truck } from "lucide-react";
import { formatPrice, FREE_SHIPPING_THRESHOLD, getProduct, productName, products } from "@/lib/catalog";
import { Gallery } from "@/components/gallery";
import { ProductForm } from "@/components/product-form";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const p = getProduct((await params).handle);
  return p ? { title: productName(p), description: p.description, openGraph: { images: [p.images[0]] } } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const product = getProduct((await params).handle);
  if (!product) notFound();
  const name = productName(product);
  const sale = product.compareAt && product.compareAt > product.price;
  const related = products.filter((p) => p.handle !== product.handle && p.collections.some((c) => product.collections.includes(c))).slice(0, 5);

  return (
    <>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-20 pt-8 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Gallery images={product.images} alt={name} />
        </div>
        <div className="lg:pt-6">
          <nav className="text-xs text-muted">
            <Link href="/">Ana Sayfa</Link> / <Link href="/collections/tum-urunler">Mağaza</Link>
          </nav>
          <h1 className="mt-4 text-3xl font-light sm:text-4xl">{name}</h1>
          <p className="mt-3 text-lg">
            {formatPrice(product.price)}
            {sale && <span className="ml-3 text-base text-muted line-through">{formatPrice(product.compareAt!)}</span>}
          </p>
          <p className="mt-1 text-xs text-muted">Vergiler dahildir.</p>

          <div className="mt-6 flex items-center gap-3 rounded-md border border-line bg-cream/60 px-4 py-3 text-xs">
            <Truck size={18} className="text-gold" />
            <span>
              <b className="font-semibold tracking-wider">ÜCRETSİZ KARGO</b> · {formatPrice(FREE_SHIPPING_THRESHOLD)} üzeri siparişlerde
            </span>
          </div>

          <div className="mt-8">
            <ProductForm product={product} />
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-sm leading-relaxed">{product.description}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {product.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="text-gold">✦</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm italic text-muted">Hassas yıkama, düşük ısıda tersten ütüleyin.</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href="/pages/beden-rehberi" className="flex items-center gap-3 rounded-md border border-line p-4 text-sm hover:border-ink">
              <Ruler size={18} className="text-gold" /> Beden rehberi
            </Link>
            <Link href="/pages/olcuye-ozel" className="flex items-center gap-3 rounded-md border border-line p-4 text-sm hover:border-ink">
              <Scissors size={18} className="text-gold" /> Ölçüye özel dikim
            </Link>
          </div>
        </div>
      </div>

      {product.video && (
        <section className="bg-ink">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 sm:px-10 lg:grid-cols-[1fr_380px]">
            <div className="text-white">
              <p className="eyebrow text-gold">Hareket halinde</p>
              <h2 className="mt-4 text-4xl font-light uppercase sm:text-5xl">
                Pistte <span className="font-display normal-case italic text-gold">nasıl</span> duruyor?
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                Kumaşın dökümünü ve paçanın figürlerdeki hareketini görün. Daha fazlası için Instagram hesabımıza göz atın.
              </p>
            </div>
            <video src={product.video} autoPlay muted loop playsInline className="aspect-[9/16] w-full rounded-md object-cover" />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-10">
          <h2 className="heading text-3xl sm:text-4xl">Bunlar da hoşunuza gidebilir</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
