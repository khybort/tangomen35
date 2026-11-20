# Tango Men35

Arjantin tango pantolonları için e-ticaret sitesi. Next.js 16 (App Router) + Cloudflare Workers (OpenNext) + D1.

Ödeme şu an online alınmıyor: ödeme sayfası bir sipariş formudur, siparişler D1'e yazılır ve `/admin` panelinde listelenir.

## Geliştirme

```bash
npm install
npm run db:migrate:local     # yerel D1 tablolarını oluşturur
npm run dev                  # http://localhost:3000
npm run preview              # Workers runtime'ında (workerd) yerel önizleme
```

Yerel admin şifresi ve imza anahtarı `.dev.vars` dosyasında (`ADMIN_PASSWORD`, `ADMIN_SECRET`). `.env*` dosyalarına gizli değer koymayın: OpenNext bunları Worker paketine gömer.

## Cloudflare'e yayınlama

Canlı adres: https://tangomen35.com (www → ana domaine 301)

Cloudflare bilgileri `.cloudflare.env` dosyasında (git dışı): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

```bash
npm run db:migrate:remote    # yeni migration eklendiğinde
npm run deploy
```

Canlı admin şifresi Cloudflare secret'ı olarak tutulur (`wrangler secret put ADMIN_PASSWORD`). Alan adı: Workers & Pages → tangomen35 → Settings → Domains & Routes.

## Yapı

- `src/lib/catalog.ts` — ürünler, koleksiyonlar, fiyatlar, marka bilgileri
- `src/lib/orders.ts` — D1 sipariş / bülten sorguları
- `migrations/` — D1 şeması
- `worker.ts` — Worker giriş noktası (www → tangomen35.com yönlendirmesi, sonra OpenNext). Next `proxy.ts` kullanmayın: OpenNext middleware'i çerezli isteklerde çöküyor.
- `src/app/(shop)` — mağaza (ana sayfa, koleksiyon, ürün, sepet, ödeme formu, sipariş takibi)
- `src/app/admin` — yönetim paneli (siparişler, durum, iç not, WhatsApp/telefon bağlantıları, bülten aboneleri)
- `public/media` — @tangomen35 Instagram gönderilerinden hazırlanmış görseller ve sessiz video döngüleri
