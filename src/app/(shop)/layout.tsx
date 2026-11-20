import { AnnouncementBar } from "@/components/announcement-bar";
import { CartProvider } from "@/components/cart";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NewsletterPopup } from "@/components/newsletter";

export default function ShopLayout({ children }: LayoutProps<"/">) {
  return (
    <CartProvider>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterPopup />
    </CartProvider>
  );
}
