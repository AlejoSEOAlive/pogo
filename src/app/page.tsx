import type { Metadata } from "next";
import Image from "next/image";
import { home, getGames, href, cdn, POGO, games, categorySlug } from "@/lib/pogo";
import GameRow from "@/components/GameRow";
import Challenges from "@/components/Challenges";
import JumpTo from "@/components/JumpTo";

export const metadata: Metadata = {
  title: "Pogo Games - Play Free Online Games",
  description:
    "Play free online games at Pogo! Enjoy word, card, puzzle, solitaire, mahjong and match 3 games. No downloads needed.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Pogo Games - Play Free Online Games",
    description: "Play free online games at Pogo! Enjoy word, card, puzzle, solitaire, mahjong and match 3 games. No downloads needed.",
    images: ["https://content.pogo.com/cms/plfm_drivers_GuestToFree_SpotlightBanner-2.jpg"],
  },
};

type Section = { id: string; type: string; title?: string; copy?: string; itemIds?: string[]; source?: string };

export default function Home() {
  const sp = home.spotlight;
  const sections = home.sections as Section[];
  const jump = sections
    .filter((s) => s.type === "game" && s.title)
    .map((s) => ({ id: s.id, label: s.title! }));

  return (
    <>
      {/* Hero / spotlight */}
      <section className="relative h-[230px] overflow-hidden md:h-[280px]">
        <picture>
          <source media="(max-width: 767px)" srcSet={sp.mobileImage} />
          { }
          <img src={sp.image} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,34,81,.9)_0%,rgba(21,34,81,0)_70%)] max-md:bg-[rgba(21,34,81,.45)]" />
        <div className="relative flex h-full flex-col justify-center px-6 max-md:items-center max-md:text-center md:px-14">
          <h1 className="text-[26px] font-medium text-hero-title md:text-[32px]">{sp.header}</h1>
          <p className="mt-4 max-w-[350px] text-base leading-tight">{sp.copy}</p>
          <a
            href={href(sp.link)}
            className="btn-primary mt-6 inline-flex h-12 w-fit items-center rounded-lg px-6 font-cond text-lg font-medium uppercase"
          >
            {sp.button}
          </a>
        </div>
      </section>

      <JumpTo items={jump} />

      {sections.map((s) => {
        if (s.type === "game") {
          const isCat = s.source === "category" || ["match-3", "board", "card", "club-pogo", "hidden-object", "multiplayer"].includes(s.id);
          const title = isCat ? `${s.title} Games` : s.title!;
          const catPath = s.id === "club-pogo" ? "/premium-online-games/club-pogo" : `/free-online-games/${categorySlug(s.id)}`;
          return (
            <GameRow
              key={s.id}
              id={s.id}
              title={title}
              games={getGames(s.itemIds ?? [])}
              allLink={isCat ? href(catPath) : undefined}
              allLabel={isCat ? `All ${s.title} Games` : undefined}
              priority={s.id === "top_games"}
            />
          );
        }
        if (s.type === "play_game") {
          const first = games[s.itemIds?.[0] ?? ""];
          return (
            <section key={s.id} className="my-6 px-6 md:px-14">
              <div className="mx-auto flex max-w-[770px] flex-col overflow-hidden rounded-lg bg-[#24325f] md:h-[120px] md:flex-row">
                <div className="relative h-[120px] md:h-full md:w-[260px] md:shrink-0">
                  <Image src={cdn("/static/v2/media/src/components/game/gameBanner/gameBanner__3hzlv.jpg")} alt="" fill sizes="(max-width:768px) 100vw, 260px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-1 p-4 text-center">
                  <h2 className="text-xl font-medium">{s.title}</h2>
                  <p className="max-w-[340px] text-sm leading-tight">{s.copy}</p>
                  <a
                    href={first ? href(first.slug) : "#"}
                    className="mt-2 inline-flex h-8 items-center rounded-md border-2 border-link px-5 font-cond text-base font-medium uppercase"
                  >
                    Play Now
                  </a>
                </div>
              </div>
            </section>
          );
        }
        if (s.type === "challenge_upsell") return <Challenges key={s.id} title={s.title!} />;
        if (s.type === "internal_ad") {
          return (
            <section key={s.id} className="relative my-6 overflow-hidden">
              <Image
                src={cdn("/static/v2/media/src/components/ads/static/bannerUpsell/background__3hvJs.jpg")}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="relative flex min-h-[200px] flex-col items-center justify-center gap-3 px-6 py-8 text-center">
                <p className="max-w-[420px] text-xl font-medium leading-tight [text-shadow:0_1px_4px_rgba(0,0,0,.6)]">
                  Save Game progress across all devices, earn rewards, get 2 days of no ADs - all free!
                </p>
                <a href={`${POGO}/server/auth/register`} className="inline-flex h-9 items-center rounded-md border-2 border-white bg-bg/40 px-5 font-cond font-medium uppercase">
                  Register Now
                </a>
                <a href={href("/club-pogo")} className="text-base font-medium underline">
                  See Benefits for Signing Up
                </a>
              </div>
            </section>
          );
        }
        return null;
      })}
      <div className="h-6" />
    </>
  );
}
