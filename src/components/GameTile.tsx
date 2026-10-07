import Image from "next/image";
import { type Game, type Label, cdn, href } from "@/lib/pogo";
import { PlayIcon, CoinIcon } from "./icons";

const labelStyle: Record<string, string> = {
  merit: "bg-label-merit",
  gotm: "bg-label-gotm",
  club: "bg-label-club",
  event: "bg-label-event",
  new: "bg-label-event",
};

export function GameLabel({ label }: { label: Label }) {
  return (
    <span
      className={`absolute left-0 top-0 z-10 flex h-6 items-center gap-1 rounded-br-md px-3 font-cond text-[13px] font-bold uppercase tracking-[0.2px] md:text-sm ${
        labelStyle[label.type] ?? "bg-label-event"
      }`}
    >
      {label.type === "club" && <CoinIcon />}
      {label.copy}
    </span>
  );
}

export default function GameTile({
  game,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 290px",
}: {
  game: Game;
  priority?: boolean;
  sizes?: string;
}) {
  const link = href(game.slug);
  const label = game.labels?.[0];
  const genre = game.categories?.[0];
  return (
    <div className="group relative">
      <a href={link} className="relative block aspect-[290/163] overflow-hidden rounded-lg bg-surface">
        {label && <GameLabel label={label} />}
        {game.img.gameTile && (
          <Image
            src={cdn(game.img.gameTile)}
            alt={game.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </a>
      <div className="mt-1 flex items-start justify-between gap-2 px-2">
        <div className="min-w-0">
          <a href={link} className="block truncate text-base leading-5 hover:underline">
            {game.name}
          </a>
          {genre && <p className="truncate text-sm font-medium leading-5 text-muted">{genre}</p>}
        </div>
        <a
          href={link}
          className="btn-primary mt-1 flex h-7 shrink-0 items-center gap-1.5 rounded px-2.5 font-cond text-sm font-medium uppercase"
          aria-label={`Play ${game.name}`}
        >
          <PlayIcon /> Play
        </a>
      </div>
    </div>
  );
}
