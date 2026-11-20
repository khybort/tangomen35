import Image from "next/image";
import Link from "next/link";
import { formatPrice, productName, type Product } from "@/lib/catalog";

export function VideoCard({ src, poster, product }: { src: string; poster: string; product: Product }) {
  const sale = product.compareAt && product.compareAt > product.price;
  return (
    <div className="min-w-[72%] snap-start sm:min-w-0">
      <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-ink">
        <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
      </div>
      <Link
        href={`/products/${product.handle}`}
        className="mt-2 flex items-center gap-3 rounded-md border border-line bg-white p-2 transition-colors hover:border-ink"
      >
        <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-sm bg-cream">
          <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs text-muted">{productName(product)}</span>
          <span className="text-xs font-semibold">{formatPrice(product.price)}</span>
          {sale && <span className="ml-2 text-xs text-muted line-through">{formatPrice(product.compareAt!)}</span>}
        </span>
      </Link>
    </div>
  );
}
