"use client";

import { useEffect, useState } from "react";
import { cdn, href, navCategories, categoryHref } from "@/lib/links";
import { ChevronDown, CloseIcon, ExternalIcon } from "./icons";

type Link = { label: string; href: string; external?: boolean };

const ICONS = {
  games: cdn("/static/v2/media/library/assets/icons/flat/games__3ynEw.svg"),
  challenges: cdn("/static/v2/media/library/assets/icons/flat/badge__2rF5c.svg"),
  community: cdn("/static/v2/media/library/assets/icons/flat/community__1m4Sj.svg"),
  register: cdn("/static/v2/media/library/assets/icons/flat/clubpogolock__3Tso6.svg"),
};

const sections: { id: string; label: string; icon: string; links: Link[] }[] = [
  {
    id: "games",
    label: "Games",
    icon: ICONS.games,
    links: [
      { label: "Browse All Games", href: href("/free-online-games") },
      ...navCategories.map((c) => ({ label: `${c.name} games`, href: categoryHref(c.name) })),
    ],
  },
  {
    id: "challenges",
    label: "Challenges",
    icon: ICONS.challenges,
    links: [
      { label: "Challenge Central", href: href("/challenge-central") },
      { label: "All Challenges", href: href("/challenges") },
      { label: "My Collection", href: href("/challenge-central/my-collection") },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: ICONS.community,
    links: [
      { label: "Pogo Articles", href: href("/articles") },
      { label: "Pogo Forum", href: "https://games-forum.pogo.com/", external: true },
      { label: "Player Support", href: href("/pogo-player-support") },
    ],
  },
];

/** Menú lateral (hamburguesa) igual al de pogo.com en mobile/tablet */
export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[60] xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      {/* Fondo */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <nav
        aria-label="Menu"
        className={`absolute inset-y-0 left-0 flex w-[360px] max-w-[92vw] flex-col bg-surface shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[62px] shrink-0 items-center justify-end bg-header px-4">
          <button onClick={onClose} aria-label="Close menu" className="p-1">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          {sections.map((s) => {
            const isOpen = expanded === s.id;
            return (
              <div key={s.id}>
                <button
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  className="flex h-12 w-full items-center gap-4 px-[22px] text-lg font-medium capitalize"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
                  <span className="flex-1 text-left">{s.label}</span>
                  <ChevronDown className={isOpen ? "rotate-180" : ""} />
                </button>
                {isOpen && (
                  <ul className="pb-2">
                    {s.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          onClick={onClose}
                          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex h-10 items-center gap-2 pl-[60px] pr-6 text-[15px] font-medium capitalize text-muted hover:text-white"
                        >
                          {l.label}
                          {l.external && <ExternalIcon className="h-3.5 w-3.5" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <a href={href("/club-pogo")} onClick={onClose} className="flex h-12 items-center gap-4 px-[22px] text-lg font-medium">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ICONS.register} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
            Why Register?
          </a>
        </div>
      </nav>
    </div>
  );
}
