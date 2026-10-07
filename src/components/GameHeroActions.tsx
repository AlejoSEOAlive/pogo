"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PlayIcon, HeartIcon, CloseIcon } from "./icons";

/**
 * Botón PLAY NOW + favorito.
 * pogo.com bloquea el iframe del juego fuera de *.pogo.com (CSP frame-ancestors),
 * así que mostramos un placeholder "Play on Pogo" que abre el juego en pogo.com.
 */
export default function GameHeroActions({ name, playUrl, background }: { name: string; playUrl: string; background: string }) {
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-8 flex items-center gap-8">
        <button
          onClick={() => setOpen(true)}
          className="btn-primary flex h-12 items-center gap-2 rounded-lg px-5 font-cond text-lg font-medium uppercase"
        >
          <PlayIcon className="h-5 w-5" /> Play Now
        </button>
        <button onClick={() => setFav((f) => !f)} aria-pressed={fav} aria-label="Add to favorites" className={fav ? "text-accent" : ""}>
          <HeartIcon className={`h-9 w-9 ${fav ? "fill-current" : ""}`} />
        </button>
      </div>

      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={`Play ${name}`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
            <div className="relative aspect-video w-full max-w-[1100px] overflow-hidden rounded-xl bg-bg shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={background} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
              <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                <p className="text-2xl font-medium md:text-4xl">{name}</p>
                <p className="max-w-md text-sm text-muted md:text-base">
                  This game runs on Pogo.com. Click below to start playing.
                </p>
                <a
                  href={playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex h-14 items-center gap-2 rounded-lg px-8 font-cond text-xl font-medium uppercase"
                >
                  <PlayIcon className="h-6 w-6" /> Play on Pogo
                </a>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-bg/60">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
