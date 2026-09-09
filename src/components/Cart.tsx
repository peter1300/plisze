import { useNavigate } from "react-router-dom";
import { getColor } from "../config/colors";
import { openingLabel, productLabel } from "../config/products";
import { formatHuf, formatSize } from "../lib/calculatePrice";
import { cartTotal, useCartStore } from "../store/useCartStore";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { MiniProductArt } from "./MiniProductArt";
import { ButtonLink } from "./ui/Button";

export function Cart() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const loadItem = useConfiguratorStore((s) => s.loadItem);
  const navigate = useNavigate();
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-24 text-center md:py-32">
        <h1 className="display text-[36px] md:text-[48px]">
          A kosár <strong>üres.</strong>
        </h1>
        <p className="mt-4 text-[16px] font-light text-mute">
          Tervezz egy pliszé szúnyoghálót, és azonnal látod az árat.
        </p>
        <ButtonLink to="/konfigurator" className="mt-8">
          Árkalkuláció
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[980px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="display text-[36px] md:text-[48px]">Kosár</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item) => {
          const color = getColor(item.colorId);
          return (
            <article key={item.id} className="grid gap-6 py-8 md:grid-cols-[160px_1fr_auto]">
              <div className="rounded-[20px] bg-surface p-4">
                <MiniProductArt type={item.productType} opening={item.opening} color={color.hex} />
              </div>
              <div>
                <h2 className="text-[18px] font-bold tracking-[-0.02em]">
                  {productLabel(item.productType)} pliszé szúnyogháló
                </h2>
                <ul className="mt-3 space-y-1 text-[14px] font-light text-mute">
                  <li>Méret: {formatSize(item.width, item.height)}</li>
                  <li>Keretszín: {color.name}</li>
                  <li>Nyitás: {openingLabel(item.opening)}</li>
                </ul>
                <div className="mt-5 flex items-center gap-5 text-[14px]">
                  <label className="flex items-center gap-2">
                    Darab
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                      className="w-14 rounded-full border border-line bg-white py-1 text-center outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    className="text-[12px] font-black tracking-[0.08em] uppercase underline decoration-line underline-offset-4"
                    onClick={() => {
                      loadItem(item);
                      navigate("/konfigurator");
                    }}
                  >
                    Módosítás
                  </button>
                  <button
                    type="button"
                    className="text-[12px] font-black tracking-[0.08em] text-mute uppercase"
                    onClick={() => removeItem(item.id)}
                  >
                    Törlés
                  </button>
                </div>
              </div>
              <p className="text-[18px] font-bold md:text-right">
                {formatHuf(item.unitPrice * item.quantity)}
              </p>
            </article>
          );
        })}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <p className="text-[15px] font-light text-mute">Az árak tartalmazzák az ÁFÁ-t. Szállítás a checkoutban.</p>
        <div className="w-full md:w-auto md:text-right">
          <p className="text-[13px] font-semibold tracking-[0.12em] text-mute uppercase">Végösszeg</p>
          <p className="mt-1 text-[32px] font-black tracking-tight">{formatHuf(total)}</p>
          <ButtonLink to="/rendeles" className="mt-5 w-full md:w-auto">
            Tovább a rendeléshez
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
