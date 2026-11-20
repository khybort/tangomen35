import Image from "next/image";
import Link from "next/link";
import { formatPrice, productName, type Product } from "@/lib/catalog";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const sale = product.compareAt && product.compareAt > product.price;
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.images[0]}
          alt={productName(product)}
          fill
          priority={priority}
          sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {(sale || product.badge) && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-medium">
            {sale ? "İndirim" : product.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm">{productName(product)}</p>
      <p className="mt-1 text-sm">
        <span className="font-semibold">{formatPrice(product.price)}</span>
        {sale && <span className="ml-2 text-muted line-through">{formatPrice(product.compareAt!)}</span>}
      </p>
    </Link>
  );
}
