"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

/** Carrusel horizontal con scroll-snap, flechas y puntos (como pogo.com) */
export default function Carousel({
  children,
  itemClass = "w-[60vw] sm:w-[290px]",
  gap = "gap-2",
}: {
  children: ReactNode[];
  itemClass?: string;
  gap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const p = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
      setPages(p);
      setPage(Math.min(p - 1, Math.round(el.scrollLeft / el.clientWidth)));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="group/car relative">
      <div ref={ref} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-px-6 px-6 md:scroll-px-[52px] md:px-[52px] ${gap}`}>
        {children.map((c, i) => (
          <div key={i} className={`shrink-0 snap-start ${itemClass}`}>
            {c}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <>
          {page > 0 && (
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-0 top-0 hidden h-[calc(100%-44px)] w-12 items-center justify-center bg-gradient-to-r from-bg to-transparent opacity-0 transition group-hover/car:opacity-100 md:flex"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
          )}
          {page < pages - 1 && (
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-0 top-0 hidden h-[calc(100%-44px)] w-12 items-center justify-center bg-gradient-to-l from-bg to-transparent opacity-0 transition group-hover/car:opacity-100 md:flex"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          )}
          <div className="mt-3 flex justify-end gap-1.5 px-6 md:px-[52px]" aria-hidden>
            {Array.from({ length: pages }).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === page ? "bg-accent" : "bg-white/30"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
