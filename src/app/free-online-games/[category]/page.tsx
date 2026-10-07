import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { categories, getGames, href, navCategories, categoryHref, cdn } from "@/lib/pogo";
import { loadContent } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import SortableGrid from "@/components/SortableGrid";
import { ExternalIcon } from "@/components/icons";
import SeoAccordion from "@/components/SeoAccordion";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/free-online-games/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = categories[category];
  if (!c) return {};
  return { title: c.seo.title, description: c.seo.metaDescription };
}

export default async function CategoryPage({ params }: PageProps<"/free-online-games/[category]">) {
  const { category } = await params;
  const c = categories[category];
  if (!c) notFound();
  const list = getGames(c.games);
  const body = loadContent("categories", category);

  return (
    <div className="mx-auto flex max-w-[1440px] gap-8 px-6 py-8 md:px-10">
      {/* Sidebar */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <p className="mb-4 border-b border-white/20 pb-4 text-xl font-medium">Jump to</p>
        <ul className="flex flex-col gap-2">
          <li>
            <a href={href("/free-online-games")} className="block py-1 text-xl text-[#c2c7d4] hover:text-white">
              All Games
            </a>
          </li>
          {navCategories.map((n) => (
            <li key={n.id}>
              <a
                href={categoryHref(n.name)}
                className={`block py-1 text-xl hover:text-white ${n.id === category ? "font-medium text-white" : "text-[#c2c7d4]"}`}
                aria-current={n.id === category ? "page" : undefined}
              >
                {n.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Games", href: href("/free-online-games") }, { label: c.name }]} />
        <SortableGrid games={list} title={c.seo.h1 ?? c.name} />

        {c.forumLink && (
          <div className="mt-8 border-t border-white/20 pt-6">
            <a href={c.forumLink} target="_blank" rel="noopener noreferrer" className="block w-[250px] overflow-hidden rounded-lg bg-surface">
              <div className="relative aspect-[250/140]">
                <Image src={cdn("/static/v2/media/src/routes/category/forumTile__7sxAy.jpg")} alt="" fill sizes="250px" className="object-cover" />
              </div>
              <span className="flex items-center justify-between px-2 py-2 text-base">
                {c.name} Games Forum <ExternalIcon />
              </span>
            </a>
          </div>
        )}

        {body && <SeoAccordion title={c.seo.accordionTitle ?? c.seo.h1 ?? ""} html={body} />}
      </div>
    </div>
  );
}
