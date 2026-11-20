import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { brand, collections, formatPrice, getProduct, productName, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { VideoCard } from "@/components/video-card";
import { Gallery } from "@/components/gallery";
import { ProductForm } from "@/components/product-form";

const IN_MOTION = [
  { video: "bej-dans", product: "pratik-pantolonu-bej" },
  { video: "sahne", product: "cift-pileli-tango-pantolonu-camel" },
  { video: "pratik", product: "seritli-genis-paca-siyah" },
  { video: "milonga-soho", product: "jakarli-tango-pantolonu-gece" },
];

const MARQUEE = ["El emeği", "Ölçüye özel dikim", "İzmir atölyesi", "Yüksek bel", "Geniş paça", "Arjantin tangosu"];

const INSTAGRAM = [
  "/media/video/kirmizi-hali.jpg",
  "/media/products/kusak-2.webp",
  "/media/video/sahne.jpg",
  "/media/products/kadife-2.webp",
  "/media/video/milonga-salon.jpg",
  "/media/video/magaza.jpg",
];

export default function Home() {
  const featured = getProduct("jakarli-tango-pantolonu-gece")!;
  const discover = collections.filter((c) => ["tango-pantolonlari", "yeni-sezon", "kadin", "aksesuar"].includes(c.handle));

  return (
    <>
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
        <video
          src="/media/video/kirmizi-hali.mp4"
          poster="/media/video/kirmizi-hali.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <p className="eyebrow text-gold-soft">Arjantin Tango Pantolonları · İzmir</p>
          <h1 className="mt-6 text-[17vw] font-light uppercase leading-[0.85] tracking-[0.06em] sm:text-[11vw]">Tarzını</h1>
          <h1 className="font-display text-[15vw] italic leading-[0.9] text-gold sm:text-[9vw]">yansıt</h1>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/collections/tum-urunler" className="bg-white px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink hover:bg-gold-soft">
              Koleksiyonu keşfet
            </Link>
            <Link href="/pages/olcuye-ozel" className="border border-white/60 px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] hover:bg-white/10">
              Ölçüye özel dikim
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-8 pt-20 sm:px-10">
        <h2 className="heading text-4xl sm:text-5xl">Hareket halinde en çok satanlar</h2>
        <p className="mt-3 text-sm text-muted">En sevilen modellerimiz, pistte.</p>
        <div className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto sm:grid sm:grid-cols-4 sm:overflow-visible">
          {IN_MOTION.map((m) => (
            <VideoCard key={m.video} src={`/media/video/${m.video}.mp4`} poster={`/media/video/${m.video}.jpg`} product={getProduct(m.product)!} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-10">
        <h2 className="heading text-4xl sm:text-5xl">Koleksiyonu keşfet</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {discover.map((c) => (
            <Link key={c.handle} href={`/collections/${c.handle}`} className="group relative aspect-[3/4] overflow-hidden bg-ink">
              <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-lg font-light uppercase tracking-wide sm:text-2xl">{c.title}</p>
                <p className="mt-1 hidden text-xs text-white/70 sm:block">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink bg-ink py-5 text-gold-soft">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-2xl font-light uppercase tracking-[0.12em] sm:text-3xl">
              {t}
              <span className="font-display text-gold">✦</span>
            </span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-[1440px] items-center lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[760px]">
            <video src="/media/video/atolye.mp4" poster="/media/video/atolye.jpg" autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-6 py-16 sm:px-16">
            <p className="eyebrow text-gold">Tango Men35 · tailor studio</p>
            <h2 className="mt-5 text-5xl font-light uppercase leading-[0.95] sm:text-6xl">
              %100 <span className="font-display normal-case italic text-gold">el emeği</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Her pantolon, İzmir&apos;deki atölyemizde kumaş seçiminden kesime, son ilmeğe kadar elde hazırlanır. Dansçıların bedenini ve
              hareketini bilerek: yüksek bel, kaymayan iç bant, figürde açılan paça.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {[
                ["7–10", "iş günü dikim"],
                ["40+", "kumaş seçeneği"],
                ["1", "usta elinden"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl text-gold">{n}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{l}</p>
                </div>
              ))}
            </div>
            <Link href="/pages/atolye" className="mt-10 inline-block border border-gold px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-ink">
              Atölyemizi tanıyın
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-10">
        <div className="flex items-end justify-between">
          <h2 className="heading text-4xl sm:text-5xl">En çok satanlar</h2>
          <Link href="/collections/en-cok-satanlar" className="text-xs font-medium uppercase tracking-[0.18em] underline underline-offset-4">
            Tümünü gör
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 5).map((p, i) => (
            <ProductCard key={p.handle} product={p} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-20 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <Gallery images={featured.images} alt={productName(featured)} />
        <div className="lg:pt-6">
          <p className="eyebrow text-gold">Öne çıkan</p>
          <h2 className="mt-3 text-3xl font-light sm:text-4xl">{productName(featured)}</h2>
          <p className="mt-3 text-lg">{formatPrice(featured.price)}</p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">{featured.description}</p>
          <div className="mt-8 max-w-lg">
            <ProductForm product={featured} />
          </div>
          <Link href={`/products/${featured.handle}`} className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.18em] underline underline-offset-4">
            Tüm detaylar
          </Link>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-10">
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium">
            <FaInstagram size={16} /> {brand.instagramHandle}
          </a>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {INSTAGRAM.map((src) => (
              <a key={src} href={brand.instagram} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-cream">
                <Image src={src} alt="Tango Men35 Instagram" fill sizes="(min-width:640px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
