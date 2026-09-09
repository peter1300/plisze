import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/faq";
import { photos } from "../data/content";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./ui/Button";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="gyik" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-[1120px] items-start gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">GYIK</p>
            <h2 className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
              Gyakori kérdések.
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16px] font-medium tracking-tight">{item.q}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.6}
                      className={`shrink-0 text-mute transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[560px] pb-5 text-[15px] leading-relaxed text-mute">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-[16px] bg-surface p-6 md:p-8">
            <img
              src={photos.consultant}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.03em]">Kérdésed van?</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-mute">
              Mérés, típus, szállítási idő — írjon, mielőtt rendel.
            </p>
            <ButtonLink to="/kapcsolat" className="mt-6">
              Kapcsolat
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
