"use client";

import { useState, type ReactNode } from "react";
import { POGO } from "@/lib/pogo";

export default function GameTabs({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<"info" | "challenges">("info");
  const tabs = [
    { id: "info" as const, label: "Game Info" },
    { id: "challenges" as const, label: "Challenges" },
  ];
  return (
    <>
      <div className="bg-[#22252e]">
        <div role="tablist" className="mx-auto flex max-w-[620px]">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-12 flex-1 border-b-4 text-lg font-medium md:text-[22px] ${
                tab === t.id ? "border-accent text-white" : "border-white/20 text-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div hidden={tab !== "info"}>{children}</div>
      {tab === "challenges" && (
        <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="text-2xl font-medium">Complete Challenges to earn Badges and in-game rewards!</p>
          <p className="text-muted">Register for free to start completing Challenges.</p>
          <a href={`${POGO}/server/auth/register`} className="btn-primary inline-flex h-11 items-center rounded-lg px-6 font-cond text-lg font-medium uppercase">
            Register Free
          </a>
        </div>
      )}
    </>
  );
}
