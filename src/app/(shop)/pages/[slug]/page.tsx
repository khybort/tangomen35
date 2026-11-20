import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { brand } from "@/lib/catalog";

type Page = { title: string; eyebrow: string; image?: string; video?: string; body: React.ReactNode };

const SIZE_ROWS = [
  ["40", "68–71", "86–89", "78"],
  ["42", "72–75", "90–93", "79"],
  ["44", "76–79", "94–97", "80"],
  ["46", "80–83", "98–101", "81"],
  ["48", "84–87", "102–105", "82"],
  ["50", "88–91", "106–109", "83"],
  ["52", "92–95", "110–113", "84"],
  ["54", "96–99", "114–117", "85"],
  ["56", "100–103", "118–121", "86"],
];

const PAGES: Record<string, Page> = {
  atolye: {
    title: "Neden Tango Men35",
    eyebrow: "Atölyemiz",
    video: "/media/video/atolye.mp4",
    body: (
      <>
        <p>
          Tango Men35, {brand.owner} tarafından İzmir&apos;de kurulmuş bir terzi atölyesi. Yıllardır yalnızca bir şeye odaklanıyoruz: pistte
          dansçıyla birlikte hareket eden Arjantin tango pantolonları.
        </p>
        <h3>Dansçının bedeni için kesim</h3>
        <p>
          Yüksek bel, gövdeyi uzatır ve abrazoda gömleğin dışarı çıkmasını önler. Kayma önleyici iç bant, figürler sırasında pantolonu yerinde tutar.
          Genişletilmiş ağ ve diz payı, sacada ve boleolarda bacağı özgür bırakır.
        </p>
        <h3>%100 el emeği</h3>
        <p>
          Kumaş seçimi, kalıp, kesim ve dikim aynı atölyede, aynı usta elinde yapılır. Jakarlı, kadife, saten ve yünlü kumaşlardan
          oluşan geniş bir seçki sunuyoruz.
        </p>
        <h3>Pistte test edildi</h3>
        <p>
          Modellerimiz Tango to İstanbul gibi festivallerde, milongalarda ve sahnelerde dansçılarımız tarafından giyiliyor. Hareketi görmek için
          Instagram&apos;da bizi takip edin.
        </p>
      </>
    ),
  },
  "olcuye-ozel": {
    title: "Ölçüye Özel Dikim",
    eyebrow: "Size özel",
    video: "/media/video/el-emegi.mp4",
    body: (
      <>
        <p>Tüm modellerimizi ölçünüze göre dikebiliriz. Ürün sayfasında beden olarak “Ölçüye Özel” seçin ve siparişinizi verin.</p>
        <h3>Nasıl işliyor?</h3>
        <ol>
          <li>Modeli ve kumaşı seçin, “Ölçüye Özel” bedeni sepete ekleyin.</li>
          <li>Ödeme formunda bel, iç bacak ve boy ölçülerinizi paylaşın ya da boş bırakın.</li>
          <li>Sizi arayıp ölçüleri birlikte netleştiriyoruz; İzmir&apos;deyseniz atölyemize davet ediyoruz.</li>
          <li>Pantolonunuz 7–10 iş günü içinde dikilip kargoya verilir.</li>
        </ol>
        <p>Ölçüye özel dikimde ek ücret yoktur; özel kumaş taleplerinde fiyatı önceden paylaşırız.</p>
      </>
    ),
  },
  "beden-rehberi": {
    title: "Beden Rehberi",
    eyebrow: "Doğru bedeni bulun",
    image: "/media/products/camel-3.webp",
    body: (
      <>
        <p>Ölçüleri üzerinizde ince bir kıyafetle, mezurayı sıkmadan alın. İki beden arasında kalırsanız büyük olanı seçin ya da ölçüye özel dikim isteyin.</p>
        <table>
          <thead>
            <tr>
              <th>Beden</th>
              <th>Bel (cm)</th>
              <th>Basen (cm)</th>
              <th>İç bacak (cm)</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map((r) => (
              <tr key={r[0]}>
                {r.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Nasıl ölçülür?</h3>
        <ul>
          <li><b>Bel:</b> Tango pantolonu yüksek beldir; göbek deliğinin hemen üzerinden ölçün.</li>
          <li><b>Basen:</b> Kalçanın en geniş noktasından.</li>
          <li><b>İç bacak:</b> Kasıktan dans ayakkabısıyla yere kadar.</li>
        </ul>
        <p>Paça boyu ayarı ücretsizdir; sipariş notuna yazmanız yeterli.</p>
      </>
    ),
  },
  "teslimat-iade": {
    title: "Teslimat & İade",
    eyebrow: "Bilgilendirme",
    body: (
      <>
        <h3>Teslimat</h3>
        <p>Hazır bedenler 1–3 iş günü, ölçüye özel siparişler 7–10 iş günü içinde kargoya verilir. 5.000 ₺ üzeri siparişlerde kargo ücretsizdir.</p>
        <h3>Ödeme</h3>
        <p>Siparişinizi aldıktan sonra sizinle iletişime geçeriz. Havale/EFT, kredi kartı ödeme linki veya kapıda ödeme seçeneklerinden biriyle ödemeyi tamamlarsınız.</p>
        <h3>Değişim ve iade</h3>
        <p>
          Hazır bedenlerde, teslimden itibaren 14 gün içinde kullanılmamış ürünleri değiştirebilir veya iade edebilirsiniz. Ölçüye özel dikilen ürünler
          kişiye özel üretildiği için iade kapsamında değildir; ancak ücretsiz tadilat yapıyoruz.
        </p>
        <h3>Kişisel veriler</h3>
        <p>Formda paylaştığınız bilgiler yalnızca siparişinizi tamamlamak ve sizinle iletişime geçmek için kullanılır, üçüncü kişilerle paylaşılmaz.</p>
      </>
    ),
  },
  iletisim: {
    title: "İletişim",
    eyebrow: "Bize ulaşın",
    image: "/media/editorial/faysal.webp",
    body: (
      <>
        <p>Model, kumaş ve ölçü sorularınız için bize her zaman yazabilirsiniz.</p>
        <div className="not-prose mt-6 grid gap-3">
          <a href={`https://wa.me/${brand.phoneRaw}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md border border-line p-4 hover:border-ink">
            <FaWhatsapp size={20} className="text-gold" /> WhatsApp · {brand.phone}
          </a>
          <a href={`tel:+${brand.phoneRaw}`} className="flex items-center gap-3 rounded-md border border-line p-4 hover:border-ink">
            <Phone size={20} className="text-gold" /> {brand.phone}
          </a>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md border border-line p-4 hover:border-ink">
            <FaInstagram size={20} className="text-gold" /> {brand.instagramHandle}
          </a>
        </div>
        <p className="mt-6">Atölye: {brand.city} · {brand.owner}</p>
      </>
    ),
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">): Promise<Metadata> {
  const p = PAGES[(await params).slug];
  return p ? { title: p.title } : {};
}

export default async function ContentPage({ params }: PageProps<"/pages/[slug]">) {
  const page = PAGES[(await params).slug];
  if (!page) notFound();
  const media = page.video || page.image;

  return (
    <div className={`mx-auto grid gap-12 px-4 pb-24 pt-14 sm:px-10 ${media ? "max-w-[1440px] lg:grid-cols-2" : "max-w-[820px]"}`}>
      <div>
        <p className="eyebrow text-gold">{page.eyebrow}</p>
        <h1 className="heading mt-4 text-5xl sm:text-6xl">{page.title}</h1>
        <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-ink/80 [&_h3]:pt-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:border-line [&_td]:py-2.5 [&_th]:border-b [&_th]:border-ink [&_th]:py-2.5 [&_th]:text-left [&_th]:font-medium [&_ul]:list-disc [&_ul]:space-y-2">
          {page.body}
        </div>
        <Link href="/collections/tum-urunler" className="mt-10 inline-block bg-ink px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white">
          Koleksiyonu keşfet
        </Link>
      </div>
      {media && (
        <div className="relative aspect-[4/5] overflow-hidden bg-ink lg:sticky lg:top-24 lg:self-start">
          {page.video ? (
            <video src={page.video} autoPlay muted loop playsInline className="h-full w-full object-cover" />
          ) : (
            <Image src={page.image!} alt={page.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          )}
        </div>
      )}
    </div>
  );
}
