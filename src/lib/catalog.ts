export type Product = {
  handle: string;
  title: string;
  color: string;
  price: number;
  compareAt?: number;
  images: string[];
  video?: string;
  sizes: string[];
  collections: string[];
  badge?: string;
  description: string;
  details: string[];
};

export type Collection = {
  handle: string;
  title: string;
  tagline: string;
  image: string;
};

const MEN_SIZES = ["40", "42", "44", "46", "48", "50", "52", "54", "56", "Ölçüye Özel"];
const WOMEN_SIZES = ["34", "36", "38", "40", "42", "Ölçüye Özel"];

const img = (name: string) => `/media/products/${name}.webp`;

export const products: Product[] = [
  {
    handle: "jakarli-tango-pantolonu-gece",
    title: "Jakarlı Tango Pantolonu",
    color: "GECE",
    price: 4250,
    images: [img("jakarli-1"), img("jakarli-2"), img("jakarli-3"), img("jakarli-4")],
    video: "/media/video/el-emegi.mp4",
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "en-cok-satanlar", "yeni-sezon"],
    badge: "Yeni",
    description:
      "Gece mavisine çalan siyah jakarlı kumaş, ışığın altında beliren çiçek deseni. Yan tokalı bel ayarı, gizli fermuar ve iç kemer bandıyla figür sırasında kaymayan, yüksek belli bir tango pantolonu.",
    details: [
      "Yüksek bel, yan tokalı ayar kemeri",
      "Kayma önleyici iç bel bandı",
      "Dans için genişletilmiş ağ ve diz payı",
      "İzmir atölyemizde elde dikilir",
    ],
  },
  {
    handle: "kadife-tango-pantolonu-bordo",
    title: "Kadife Tango Pantolonu",
    color: "BORDO",
    price: 4650,
    images: [img("kadife-1"), img("kadife-2"), img("kadife-3"), img("kadife-4")],
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "yeni-sezon", "en-cok-satanlar"],
    badge: "Yeni",
    description:
      "Derin bordo kadife, yan dikişte el örgüsü bağcık detayı. Milonga ışıklarında zengin bir dökümle hareket eden, sahne ve gala geceleri için tasarlanmış imza modelimiz.",
    details: [
      "Yan dikişte el örgüsü bağcık detayı",
      "Yumuşak tutumlu esnek kadife",
      "Geniş paça, hareketle dalgalanan döküm",
      "Sınırlı sayıda üretim",
    ],
  },
  {
    handle: "cift-pileli-tango-pantolonu-camel",
    title: "Çift Pileli Tango Pantolonu",
    color: "CAMEL",
    price: 3950,
    compareAt: 4400,
    images: [img("camel-1"), img("camel-2"), img("camel-3"), img("camel-4")],
    video: "/media/video/kirmizi-hali.mp4",
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "en-cok-satanlar"],
    description:
      "Klasik Buenos Aires siluetinin modern yorumu: çift pile, yüksek bel ve yan ayar kemeri. Tango to İstanbul kırmızı halısında giyildi.",
    details: [
      "Çift ters pile, rahat basen",
      "Yan ayar kemerli yüksek bel",
      "Dökümlü, buruşmaya dirençli kumaş",
      "Paça boyu ücretsiz ayarlanır",
    ],
  },
  {
    handle: "pratik-pantolonu-bej",
    title: "Rahat Kesim Pratik Pantolonu",
    color: "BEJ",
    price: 3450,
    images: [img("bej-1"), img("bej-2"), img("bej-3")],
    video: "/media/video/bej-dans.mp4",
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "en-cok-satanlar"],
    description:
      "Pratik ve milonga arasında geçiş yapan rahat kesim. Esnek kumaşı ve geniş paçasıyla sacada, giro ve boleolarda bacağı özgür bırakır.",
    details: [
      "Esnek pamuk karışımlı kumaş",
      "Geniş, düz paça",
      "Arka cep ve kemer köprüleri",
      "Günlük kullanıma da uygun",
    ],
  },
  {
    handle: "seritli-genis-paca-siyah",
    title: "Şeritli Geniş Paça Pantolon",
    color: "SİYAH",
    price: 3650,
    images: [img("cizgili-1"), img("cizgili-2")],
    video: "/media/video/pratik.mp4",
    sizes: WOMEN_SIZES,
    collections: ["kadin", "en-cok-satanlar"],
    description:
      "Yan şeritli, yüksek belli geniş paça. Kadın dansçılar için hareketi vurgulayan sportif ve şık bir siluet.",
    details: [
      "Yan kontrast şerit",
      "Yüksek bel, düz kesim",
      "Akışkan, hafif kumaş",
      "Pratik ve milongada rahat",
    ],
  },
  {
    handle: "yuksek-bel-pantolon-bordo-kusak",
    title: "Yüksek Bel Pantolon & Kuşak",
    color: "SİYAH / BORDO",
    price: 4900,
    images: [img("kusak-1"), img("kusak-2")],
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "yeni-sezon"],
    description:
      "Siyah yüksek bel tango pantolonu ve bordo saten kuşaktan oluşan takım. Balıkçı yaka ile tamamlandığında gala geceleri için zamansız bir görünüm.",
    details: [
      "Pantolon + bordo saten kuşak takım",
      "Önde pile, yüksek bel",
      "Kuşak ayrı da kullanılabilir",
      "Ölçüye özel dikim seçeneği",
    ],
  },
  {
    handle: "saten-pantolon-etek-ates",
    title: "Saten Pantolon-Etek",
    color: "ATEŞ",
    price: 4450,
    images: [img("saten-1"), img("saten-2"), img("saten-3"), img("saten-4")],
    video: "/media/video/kirmizi-hali.mp4",
    sizes: WOMEN_SIZES,
    collections: ["kadin", "yeni-sezon"],
    badge: "Yeni",
    description:
      "Ateş desenli saten, yanda yırtmaçlı pantolon-etek. Durduğunda pantolon, döndüğünde etek gibi açılan tasarım; atölyemizin yeni modeli.",
    details: [
      "Akışkan desenli saten",
      "Yanda hareketle açılan yırtmaç",
      "Yüksek bel, ince kemer",
      "Sınırlı sayıda üretim",
    ],
  },
  {
    handle: "klasik-tango-pantolonu-siyah",
    title: "Klasik Tango Pantolonu",
    color: "SİYAH",
    price: 4250,
    images: [img("siyah-klasik-3"), img("siyah-klasik-1"), img("siyah-klasik-2")],
    sizes: MEN_SIZES,
    collections: ["tango-pantolonlari", "yeni-sezon"],
    badge: "Yeni",
    description:
      "Gece siyahı, yüksek belli klasik tango pantolonu. Ütü çizgisi keskin, paçası dökümlü; ceketle takım olarak ya da gömlekle tek başına milongadan galaya her yerde.",
    details: [
      "Yüksek bel, önde pile",
      "Keskin ütü çizgisi, dökümlü paça",
      "Dans için genişletilmiş ağ ve diz payı",
      "Paça boyu ücretsiz ayarlanır",
    ],
  },
  {
    handle: "islemeli-genis-paca-inci",
    title: "İşlemeli Geniş Paça Pantolon",
    color: "İNCİ",
    price: 4650,
    images: [img("isleme-1"), img("isleme-3"), img("isleme-4"), img("isleme-2")],
    sizes: WOMEN_SIZES,
    collections: ["kadin", "yeni-sezon", "en-cok-satanlar"],
    badge: "Yeni",
    description:
      "İnci tonlarında yüksek belli geniş paça pantolon; yan dikiş boyunca uzanan el işlemesi şerit, ışıkta parlayan payetli üstlerle tamamlanır. Sahne ve gala geceleri için tasarlandı.",
    details: [
      "Yan dikişte el işlemesi dekoratif şerit",
      "Yüksek bel, önde pile",
      "Volkada ve boleoda açılan geniş paça",
      "Atölyemizde elde dikilir",
    ],
  },
  {
    handle: "saten-kusak-bordo",
    title: "Saten Tango Kuşağı",
    color: "BORDO",
    price: 1250,
    images: [img("kusak-1"), img("kusak-2")],
    sizes: ["Standart"],
    collections: ["aksesuar"],
    description:
      "Yüksek bel pantolonlarla uyumlu, tokalı bordo saten kuşak. Siyah kıyafetlere tek dokunuşla tango karakteri katar.",
    details: ["Tokalı ayarlanabilir kapama", "Saten yüzey, astarlı", "Tek beden"],
  },
];

export const collections: Collection[] = [
  {
    handle: "tum-urunler",
    title: "Tüm Ürünler",
    tagline: "Dansçı tarafından tasarlandı. Pistte hareket için dikildi.",
    image: img("jakarli-4"),
  },
  {
    handle: "tango-pantolonlari",
    title: "Tango Pantolonları",
    tagline: "Yüksek bel, geniş paça, sınırsız hareket.",
    image: img("camel-2"),
  },
  {
    handle: "yeni-sezon",
    title: "Yeni Sezon",
    tagline: "Atölyeden yeni çıkan modeller.",
    image: img("kadife-2"),
  },
  {
    handle: "kadin",
    title: "Kadın",
    tagline: "Pantolon-etek ve geniş paça modeller.",
    image: img("isleme-1"),
  },
  {
    handle: "aksesuar",
    title: "Aksesuar",
    tagline: "Kuşaklar ve tamamlayıcı parçalar.",
    image: img("kusak-1"),
  },
  {
    handle: "en-cok-satanlar",
    title: "En Çok Satanlar",
    tagline: "Pistte en çok tercih edilenler.",
    image: img("bej-2"),
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export function getCollection(handle: string) {
  return collections.find((c) => c.handle === handle);
}

export function getCollectionProducts(handle: string) {
  if (handle === "tum-urunler") return products;
  return products.filter((p) => p.collections.includes(handle));
}

export function productName(p: Pick<Product, "title" | "color">) {
  return `${p.title} - ${p.color}`;
}

const tl = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return tl.format(value);
}

export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 150;

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
}

export const brand = {
  name: "Tango Men35",
  tagline: "tailor studio",
  instagram: "https://www.instagram.com/tangomen35/",
  instagramHandle: "@tangomen35",
  phone: "+90 532 200 96 62",
  phoneRaw: "905322009662",
  owner: "Faysal Güneş",
  city: "İzmir",
};
