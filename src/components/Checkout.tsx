import { useState, type FormEvent } from "react";
import { getColor } from "../config/colors";
import { productLabel } from "../config/products";
import { formatHuf, formatSize } from "../lib/calculatePrice";
import { cartTotal, useCartStore } from "../store/useCartStore";
import type { CheckoutForm } from "../types";
import { Button, ButtonLink } from "./ui/Button";

const empty: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  shippingStreet: "",
  shippingCity: "",
  shippingZip: "",
  billingSame: true,
  billingStreet: "",
  billingCity: "",
  billingZip: "",
  isCompany: false,
  companyName: "",
  taxNumber: "",
  payment: "transfer",
  note: "",
};

export function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = cartTotal(items);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CheckoutForm>(empty);
  const [orderId, setOrderId] = useState<string | null>(null);

  const set = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  if (items.length === 0 && !orderId) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-24 text-center">
        <h1 className="display text-[32px] md:text-[40px]">
          A kosár <strong>üres.</strong>
        </h1>
        <ButtonLink to="/konfigurator" className="mt-8">
          Tervezz egy szúnyoghálót
        </ButtonLink>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-24 text-center">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Rendelés rögzítve</p>
        <h1 className="display mt-3 text-[36px] md:text-[48px]">
          Köszönjük.
        </h1>
        <p className="mt-4 text-[16px] font-light text-mute">
          A rendelésed száma <span className="font-medium text-ink">{orderId}</span>. Ez egy demó checkout — valós fizetés nincs.
        </p>
        <ButtonLink to="/" className="mt-8">
          Vissza a főoldalra
        </ButtonLink>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    const id = `PL-${Date.now().toString().slice(-6)}`;
    setOrderId(id);
    clear();
  };

  const field =
    "w-full border-b border-line bg-transparent py-3 text-[16px] outline-none transition focus:border-ink";

  return (
    <div className="mx-auto grid max-w-[1040px] gap-12 px-5 py-12 md:px-8 lg:grid-cols-[1fr_340px]">
      <form onSubmit={submit}>
        <h1 className="display text-[36px] md:text-[48px]">Rendelés</h1>
        <div className="mt-6 mb-10 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={`h-1 flex-1 rounded-full ${s <= step ? "bg-gold" : "bg-line"}`}
            />
          ))}
        </div>
        <p className="mb-8 text-[12px] font-semibold tracking-[0.14em] text-mute uppercase">
          {step === 1 && "Kapcsolati adatok"}
          {step === 2 && "Szállítás"}
          {step === 3 && "Fizetés"}
          {step === 4 && "Összegzés"}
        </p>

        {step === 1 && (
          <div className="space-y-2">
            <input className={field} required placeholder="Név" value={form.name} onChange={(e) => set("name", e.target.value)} />
            <input className={field} required type="email" placeholder="E-mail" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <input className={field} required type="tel" placeholder="Telefonszám" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p className="pb-2 text-[14px] font-medium">Szállítási cím</p>
            <input className={field} required placeholder="Utca, házszám" value={form.shippingStreet} onChange={(e) => set("shippingStreet", e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input className={field} required placeholder="Irányítószám" value={form.shippingZip} onChange={(e) => set("shippingZip", e.target.value)} />
              <input className={field} required placeholder="Város" value={form.shippingCity} onChange={(e) => set("shippingCity", e.target.value)} />
            </div>
            <label className="mt-6 flex items-center gap-3 py-3 text-[14px]">
              <input
                type="checkbox"
                checked={form.billingSame}
                onChange={(e) => set("billingSame", e.target.checked)}
              />
              A számlázási cím megegyezik a szállítási címmel
            </label>
            {!form.billingSame && (
              <div className="space-y-2 pt-2">
                <p className="pb-2 text-[14px] font-medium">Számlázási cím</p>
                <input className={field} placeholder="Utca, házszám" value={form.billingStreet} onChange={(e) => set("billingStreet", e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <input className={field} placeholder="Irányítószám" value={form.billingZip} onChange={(e) => set("billingZip", e.target.value)} />
                  <input className={field} placeholder="Város" value={form.billingCity} onChange={(e) => set("billingCity", e.target.value)} />
                </div>
              </div>
            )}
            <label className="flex items-center gap-3 py-3 text-[14px]">
              <input
                type="checkbox"
                checked={form.isCompany}
                onChange={(e) => set("isCompany", e.target.checked)}
              />
              Céges vásárlás
            </label>
            {form.isCompany && (
              <div className="space-y-2">
                <input className={field} placeholder="Cégnév" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                <input className={field} placeholder="Adószám" value={form.taxNumber} onChange={(e) => set("taxNumber", e.target.value)} />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => set("payment", "card")}
              className={`w-full rounded-[20px] px-5 py-5 text-left ${form.payment === "card" ? "bg-ink text-white" : "bg-surface"}`}
            >
              <span className="block text-[16px] font-medium">Bankkártya</span>
              <span className={`mt-1 block text-[13px] ${form.payment === "card" ? "text-white/70" : "text-mute"}`}>
                Előkészített. A demóban nincs valós terhelés.
              </span>
            </button>
            <button
              type="button"
              onClick={() => set("payment", "transfer")}
              className={`w-full rounded-[20px] px-5 py-5 text-left ${form.payment === "transfer" ? "bg-ink text-white" : "bg-surface"}`}
            >
              <span className="block text-[16px] font-medium">Átutalás</span>
              <span className={`mt-1 block text-[13px] ${form.payment === "transfer" ? "text-white/70" : "text-mute"}`}>
                A rendelés után e-mailben küldjük a számlaszámot.
              </span>
            </button>
            <textarea
              className={`${field} mt-4 min-h-[80px] resize-none`}
              placeholder="Megjegyzés (opcionális)"
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-[15px] leading-relaxed">
            <p>
              <span className="text-mute">Név</span>
              <br />
              {form.name}
            </p>
            <p>
              <span className="text-mute">Elérhetőség</span>
              <br />
              {form.email} · {form.phone}
            </p>
            <p>
              <span className="text-mute">Szállítás</span>
              <br />
              {form.shippingZip} {form.shippingCity}, {form.shippingStreet}
            </p>
            <p>
              <span className="text-mute">Fizetés</span>
              <br />
              {form.payment === "card" ? "Bankkártya" : "Átutalás"}
            </p>
            {form.isCompany && (form.companyName || form.taxNumber) && (
              <p>
                <span className="text-mute">Cég</span>
                <br />
                {[form.companyName, form.taxNumber].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            className="text-[14px] disabled:opacity-30"
            disabled={step === 1}
          >
            Vissza
          </button>
          <Button type="submit">{step < 4 ? "Tovább" : "Megrendelés elküldése"}</Button>
        </div>
      </form>

      <aside className="h-fit border-t border-line pt-8 lg:border-t-0 lg:pt-2">
        <p className="text-[12px] font-semibold tracking-[0.14em] text-mute uppercase">Rendelésed</p>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-[14px]">
              <span>
                {productLabel(item.productType)} · {formatSize(item.width, item.height)}
                <br />
                <span className="text-mute">
                  {getColor(item.colorId).name} · {item.quantity} db
                </span>
              </span>
              <span>{formatHuf(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[24px] font-black">{formatHuf(total)}</p>
        <p className="mt-1 text-[12px] text-mute">ÁFÁ-val. Demó rendelés.</p>
      </aside>
    </div>
  );
}
