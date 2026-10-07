import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { games, gamePages, getGames, href, cdn, categoryHref } from "@/lib/pogo";
import { loadContent } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameRow from "@/components/GameRow";
import Carousel from "@/components/Carousel";
import GameHeroActions from "@/components/GameHeroActions";
import GameTabs from "@/components/GameTabs";
import NotFoundView from "@/components/NotFoundView";
import { ExternalIcon } from "@/components/icons";

export const dynamicParams = false;

/** Juegos retirados en pogo.com: la URL existe pero muestra "Page Not Found" */
const RETIRED = new Set<string>([]);

export function generateStaticParams() {
  return [...Object.values(gamePages).map((g) => ({ slug: g.slug })), ...[...RETIRED].map((slug) => ({ slug }))];
}

function findGame(slug: string) {
  const entry = Object.entries(gamePages).find(([, p]) => p.slug === slug);
  if (!entry) return null;
  const [code, page] = entry;
  return { game: games[code], page };
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (RETIRED.has(slug)) return { title: "Page Not Found | Pogo" };
  const f = findGame(slug);
  if (!f) return {};
  return {
    title: f.page.title,
    description: f.page.metaDescription,
    openGraph: { title: f.page.title, description: f.page.metaDescription, images: [cdn(f.game.img.spotlightGame)] },
  };
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const { slug } = await params;
  if (RETIRED.has(slug)) return <NotFoundView />;
  const f = findGame(slug);
  if (!f) notFound();
  const { game, page } = f;
  const p = page;
  const body = loadContent("games", slug);
  const playUrl = `https://www.pogo.com/games/${slug}/play`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    description: p.tagLine,
    image: cdn(game.img.spotlightGame),
    url: `https://www.pogo.com/games/${slug}`,
    genre: p.categories,
    gamePlatform: ["Web browser", "Mobile"],
    applicationCategory: "Game",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Electronic Arts Inc." },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative h-[550px] overflow-hidden">
        <Image
          src={cdn(game.img.spotlightGame)}
          alt="Game Screenshot Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] max-md:opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,25,32,.85)_0%,rgba(22,25,32,.35)_45%,rgba(22,25,32,0)_70%)]" />
        <div className="relative flex flex-col px-6 pt-6 max-md:items-center max-md:text-center md:max-w-[660px] md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "All Games", href: href("/free-online-games") },
              ...(p.breadcrumbCategory ? [{ label: p.breadcrumbCategory, href: categoryHref(p.breadcrumbCategory) }] : []),
              { label: game.name },
            ]}
          />
          <p className="mt-6 text-[34px] font-medium leading-10 md:text-[46px]">{game.name}</p>
          {game.playerCount != null && <p className="mt-2 text-base text-muted">{game.playerCount} Playing Now!</p>}
          <p className="mt-5 max-w-[580px] text-base leading-snug md:text-lg">{p.tagLine}</p>
          <GameHeroActions name={game.name} playUrl={playUrl} background={cdn(game.img.gameBackground ?? game.img.spotlightGame)} />
        </div>
      </section>

      <GameTabs>
        {/* Game Media */}
        <section className="py-6">
          <h2 className="mb-4 px-6 text-[31px] font-medium md:px-14 md:text-[38px]">Game Media</h2>
          <Carousel itemClass="w-[85vw] sm:w-[234px]" gap="gap-3">
            {p.screenshots.map((s, i) => (
              <div key={s} className="relative aspect-[234/132] overflow-hidden rounded">
                <Image src={cdn(s)} alt="Game Screenshot Image" fill sizes="(max-width:640px) 85vw, 234px" className="object-cover" loading={i < 2 ? "eager" : "lazy"} />
              </div>
            ))}
          </Carousel>
        </section>

        <div className="grid gap-10 px-6 pb-8 md:px-14 lg:grid-cols-[minmax(0,590px)_minmax(0,300px)]">
          <section>
            <h2 className="border-b border-white/30 pb-2 text-[31px] font-medium md:text-[38px]">Description</h2>
            <h1 className="mt-6 text-[22px] font-medium leading-[22px] md:text-[26px] md:leading-[26px]">{p.h1}</h1>
            {body && <div className="prose-pogo prose-game mt-4" dangerouslySetInnerHTML={{ __html: body }} />}
          </section>
          {(p.categories.length > 0 || p.forumLink) && (
          <section>
            <h2 className="border-b border-white/30 pb-2 text-[31px] font-medium md:text-[38px]">Game Details</h2>
            {p.categories.length > 0 && <div className="mt-6 flex items-start gap-3">
              <span className="pt-2 font-cond text-xs font-bold uppercase">Genre:</span>
              <ul className="flex flex-wrap gap-2">
                {p.categories.map((c) => (
                  <li key={c}>
                    <a href={categoryHref(c)} className="flex h-9 items-center rounded-full bg-[#2757a5] px-3 text-base uppercase hover:bg-[#2f6fd1]">
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>}
            {p.forumLink && (
              <p className="mt-6 flex items-center gap-2">
                <span className="font-cond text-xs font-bold uppercase">Links:</span>
                <a href={p.forumLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-base font-medium text-[#4fc3f7] underline">
                  Forum <ExternalIcon className="h-3.5 w-3.5" />
                </a>
              </p>
            )}
          </section>
          )}
        </div>
      </GameTabs>

      <GameRow title="Related Games" games={getGames(p.related)} />
    </>
  );
}
