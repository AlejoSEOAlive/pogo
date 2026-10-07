import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { articles, blogCategories, href, cdn } from "@/lib/pogo";
import { loadContent } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import MoreArticles from "@/components/MoreArticles";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    openGraph: { type: "article", title: a.seoTitle, description: a.seoDescription, images: [a.image] },
  };
}

const fmtDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).toUpperCase();

export default async function ArticlePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) notFound();
  const cat = blogCategories.find((c) => c.categoryId === a.categoryIds[0]);
  const body = loadContent("articles", slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.seoDescription,
    image: a.image,
    datePublished: new Date(a.publishDate).toISOString(),
    author: { "@type": "Organization", name: a.author },
    publisher: { "@type": "Organization", name: "Pogo" },
    keywords: a.keywords.join(", "),
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_top_left,#1d2f33_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,#2b1a3a_0%,transparent_45%)] px-4 py-8 md:px-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-[1330px] rounded-[28px] border border-white/20 bg-bg/60 px-5 pb-12 pt-10 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center">
            <a href={href("/articles")} className="text-sm font-medium underline">
              &lt; Back to Articles
            </a>
            <Breadcrumbs
              className="mt-2 justify-center [&_ol]:justify-center"
              items={[
                { label: "Home", href: "/" },
                { label: "Articles", href: href("/articles") },
                ...(cat ? [{ label: cat.name, href: href(cat.path) }] : []),
                { label: a.title },
              ]}
            />
            <h1 className="mt-4 text-[32px] font-medium leading-tight md:text-[44px]">{a.title}</h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg font-medium leading-snug text-muted md:text-xl">{a.description}</p>
          </div>

          <div className="relative mt-8 aspect-[760/425] overflow-hidden rounded-xl">
            <Image src={cdn(a.image)} alt={a.imageAltText ?? a.title} fill priority sizes="(max-width: 800px) 100vw, 760px" className="object-cover" />
          </div>

          {body && <div className="prose-pogo prose-article mt-10" dangerouslySetInnerHTML={{ __html: body }} />}

          <footer className="mt-12 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn("/static/v2/media/src/routes/blogPost/avatar__FVmzK.svg")} alt="Author avatar" width={48} height={48} className="h-12 w-12 rounded-full" />
              <div>
                <p className="text-base">{a.author}</p>
                <p className="font-cond text-xs font-bold text-muted">{fmtDate(a.publishDate)}</p>
              </div>
            </div>
            <p className="mt-4 text-base">
              Keywords:{" "}
              {a.keywords.map((k, i) => (
                <span key={k}>
                  <a href={href(`/articles?keyword=${encodeURIComponent(k)}`)} className="font-medium text-muted underline">
                    {k.replace(/\b\w/g, (m) => m.toUpperCase())}
                  </a>
                  {i < a.keywords.length - 1 && ", "}
                </span>
              ))}
            </p>
          </footer>
        </div>
      </article>

      <MoreArticles items={a.more} />
    </div>
  );
}
