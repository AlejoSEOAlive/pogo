"use client";

import { useEffect, useState } from "react";
import { POGO } from "@/lib/links";

/** Tooltip "Get More Perks" que pogo.com muestra a invitados bajo "Why Register?" */
export default function PerksTooltip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("perksDismissed") === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem("perksDismissed", "1");
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-label="Get More Perks"
      className="absolute right-[230px] top-[72px] z-40 hidden w-[310px] rounded-lg bg-[#2f6fd1] p-4 shadow-xl xl:block"
    >
      <span className="absolute -top-2 right-[130px] h-4 w-4 rotate-45 bg-[#2f6fd1]" />
      <button onClick={close} aria-label="Close" className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-sm">
        ✕
      </button>
      <p className="mb-2 text-2xl font-medium">Get More Perks</p>
      <p className="text-sm leading-snug">
        Get 2 days with 0 ADs, save your game progress across devices, unlock more Games and rewards - all FREE!
      </p>
      <p className="mt-1 text-sm">
        <a href={`${POGO}/server/auth/register`} className="underline">Register Now</a> or{" "}
        <a href={`${POGO}/club-pogo`} className="underline">Learn More<span className="sr-only"> about registering on Pogo</span></a>
      </p>
    </div>
  );
}
