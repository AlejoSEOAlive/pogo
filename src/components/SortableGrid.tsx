"use client";

import { useMemo, useState } from "react";
import type { Game } from "@/lib/links";
import GameTile from "./GameTile";
import { ChevronDown } from "./icons";

const SORTS = ["Top Games", "Alphabetical", "Players Online"] as const;
type Sort = (typeof SORTS)[number];

export default function SortableGrid({ games, title }: { games: Game[]; title: string }) {
  const [sort, setSort] = useState<Sort>("Top Games");
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    if (sort === "Alphabetical") return [...games].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Players Online") return [...games].sort((a, b) => (b.playerCount ?? 0) - (a.playerCount ?? 0));
    return games;
  }, [games, sort]);

  return (
    <>
      <div className="mb-6 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-medium md:text-xl">{title}</h1>
        <div className="relative self-end sm:self-auto">
          <button className="flex items-center gap-1 text-lg" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            Sort by: <span className="font-medium">{sort}</span> <ChevronDown className={open ? "rotate-180" : ""} />
          </button>
          {open && (
            <ul className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg bg-surface shadow-xl">
              {SORTS.map((s) => (
                <li key={s}>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-surface-2 ${s === sort ? "text-link" : ""}`}
                    onClick={() => {
                      setSort(s);
                      setOpen(false);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {list.map((g, i) => (
          <GameTile key={g.code} game={g} priority={i < 4} sizes="wide" />
        ))}
      </div>
    </>
  );
}
