import { Link } from "react-router-dom";
import { placements } from "../data/content";
import { Reveal } from "./Reveal";

export function PlacementCards() {
  return (
    <section id="termekek" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Termékeink</p>
          <h2 className="display mt-3 max-w-[720px] text-[36px] md:text-[52px]">
            Egy termék. <strong>Minden nyílászáróra.</strong>
          </h2>
          <p className="mt-4 max-w-[520px] text-[16px] font-light text-mute">
            A bejárattól a teraszig — kizárólag pliszé szúnyogháló, egyedi méretre.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {placements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <Link to={item.href} className="group block overflow-hidden rounded-[28px]">
                <div className="relative aspect-[4/5]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
                    {item.label}
                  </span>
                </div>
                <div className="bg-surface px-5 py-5">
                  <h3 className="text-[20px] font-bold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-1 text-[14px] font-light text-mute">{item.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
