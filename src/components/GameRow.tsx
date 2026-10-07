import type { Game } from "@/lib/links";
import Carousel from "./Carousel";
import GameTile from "./GameTile";

export default function GameRow({
  id,
  title,
  games,
  allLink,
  allLabel,
  priority = false,
  deferRender = false,
}: {
  id?: string;
  title: string;
  games: Game[];
  allLink?: string;
  allLabel?: string;
  priority?: boolean;
  /** content-visibility:auto para filas fuera de pantalla (menos trabajo de render) */
  deferRender?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-4 ${deferRender ? "[contain-intrinsic-size:auto_300px] [content-visibility:auto]" : ""}`}>
      <div className="mb-2 flex items-baseline justify-between px-6 md:px-14">
        <h2 className="text-xl font-medium md:text-[22px]">{title}</h2>
        {allLink && (
          <a href={allLink} className="text-base font-medium underline hover:text-link">
            {allLabel}
          </a>
        )}
      </div>
      <Carousel>
        {games.map((g, i) => (
          <GameTile key={g.code} game={g} priority={priority && i < 3} />
        ))}
      </Carousel>
    </section>
  );
}
