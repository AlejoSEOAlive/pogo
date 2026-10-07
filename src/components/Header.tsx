"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LOGO, POGO, href, navCategories, categoryHref, games, cdn } from "@/lib/pogo";
import { ChevronDown, SearchIcon, ShieldIcon, MenuIcon } from "./icons";
import PerksTooltip from "./PerksTooltip";
import MobileDrawer from "./MobileDrawer";

const explore = [
  { label: "Challenge Central", path: "/challenge-central" },
  { label: "All Challenges", path: "/challenges" },
  { label: "My Collection", path: "/challenge-central/my-collection" },
  { label: "Pogo Articles", path: "/articles" },
  { label: "Player Support", path: "/pogo-player-support" },
];
const exploreGames = ["brisket", "wordwhomp_h5", "meho_h5", "wheel_h5", "firstclass_h5"];

export default function Header() {
  const [open, setOpen] = useState<null | "games" | "explore" | "mobile">(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (k: "games" | "explore" | "mobile") => setOpen((o) => (o === k ? null : k));

  return (
    <header ref={ref} className="sticky top-0 z-50 bg-header shadow-[0_2px_6px_rgba(0,0,0,.35)]">
      <div className="flex h-[62px] items-center gap-3 pl-3 pr-3 md:pl-6">
        <button
          className="p-2 xl:hidden"
          aria-label="Menu"
          aria-expanded={open === "mobile"}
          onClick={() => toggle("mobile")}
        >
          <MenuIcon />
        </button>
        <Link href="/" aria-label="Pogo home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="pogo logo" width={78} height={28} className="h-10 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Main">
          <button
            className="flex items-center gap-1 px-4 text-xl font-medium"
            aria-expanded={open === "games"}
            onClick={() => toggle("games")}
          >
            Games <ChevronDown className={open === "games" ? "rotate-180" : ""} />
          </button>
        </nav>

        <form action={`${POGO}/search`} className="relative hidden sm:block" role="search">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
          <input
            name="q"
            type="search"
            placeholder="Search games"
            aria-label="Search games"
            className="h-[38px] w-[180px] rounded-md bg-surface-2 pl-8 pr-2 text-base text-muted placeholder:text-muted focus:w-60 focus:outline-none focus:ring-2 focus:ring-link transition-[width]"
          />
        </form>
        <a href={`${POGO}/search`} className="p-2 sm:hidden" aria-label="Search">
          <SearchIcon className="h-6 w-6" />
        </a>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <a href={href("/club-pogo")} className="hidden items-center gap-2 text-xl font-medium xl:flex">
            <ShieldIcon /> Why Register?
          </a>
          <div className="relative hidden xl:block">
            <button
              className="flex items-center gap-1 px-3 text-xl font-medium"
              aria-expanded={open === "explore"}
              onClick={() => toggle("explore")}
            >
              Explore <ChevronDown className={open === "explore" ? "rotate-180" : ""} />
            </button>
          </div>
          <a
            href={`${POGO}/server/auth/login`}
            className="flex h-9 items-center rounded-md border-2 border-link bg-bg/40 px-3 font-cond text-base font-medium uppercase md:px-5"
          >
            Sign In
          </a>
          <a
            href={`${POGO}/server/auth/register`}
            className="btn-primary flex h-9 items-center rounded-md px-3 font-cond text-base font-medium uppercase md:px-4"
          >
            <span className="md:hidden">Register</span>
            <span className="hidden md:inline">Register Free</span>
          </a>
        </div>
      </div>

      {/* Games dropdown */}
      {open === "games" && (
        <div className="absolute left-0 right-0 top-[62px] border-t border-white/10 bg-bg/95 px-6 py-6 backdrop-blur">
          <a href={href("/free-online-games")} className="mb-4 inline-block font-cond text-lg font-bold uppercase text-link hover:underline">
            Browse All Games
          </a>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {navCategories.map((c) => (
              <li key={c.id}>
                <a href={categoryHref(c.name)} className="text-lg hover:text-link" onClick={() => setOpen(null)}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Explore dropdown */}
      {open === "explore" && (
        <div className="absolute left-0 right-0 top-[62px] border-t border-white/10 bg-bg/95 px-6 py-6 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-[260px] rounded-lg bg-header/40 p-5">
              <p className="text-lg font-medium">Join for Free</p>
              <p className="mt-1 text-sm text-muted">Save game progress, earn rewards and get 2 days of no ADs.</p>
              <a href={`${POGO}/server/auth/register`} className="btn-primary mt-4 inline-flex h-10 items-center rounded-lg px-4 font-cond font-medium uppercase">
                Register Now
              </a>
            </div>
            <ul className="flex min-w-[220px] flex-col gap-3">
              {explore.map((l) => (
                <li key={l.path}>
                  <a href={href(l.path)} className="font-cond text-lg font-medium uppercase hover:text-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-5">
              {exploreGames.map((c) => {
                const g = games[c];
                if (!g) return null;
                return (
                  <a key={c} href={href(g.slug)} className="group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cdn(g.img.gameTile)} alt={g.name} className="aspect-[16/9] w-full rounded-lg object-cover" loading="lazy" />
                    <span className="mt-1 block truncate text-sm group-hover:text-link">{g.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <MobileDrawer open={open === "mobile"} onClose={() => setOpen(null)} />
      <PerksTooltip />
    </header>
  );
}
