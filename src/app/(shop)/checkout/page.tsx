import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = { title: "Ödeme" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-12 sm:px-10">
      <h1 className="heading text-4xl sm:text-5xl">Ödeme</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Formu doldurun; siparişinizi aldığımızda seçtiğiniz kanaldan sizinle iletişime geçip ölçü ve ödeme adımlarını birlikte tamamlayalım.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
