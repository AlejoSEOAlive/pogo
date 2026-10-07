import Image from "next/image";
import { type MoreArticle, blogCategories, cdn, href } from "@/lib/pogo";

export default function MoreArticles({ items }: { items: MoreArticle[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-medium">More Articles</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fill,258px)]">
        {items.map((m) => {
          const cat = blogCategories.find((c) => c.categoryId === m.categoryIds?.[0]);
          return (
            <a key={m.path} href={href(m.path)} className="group overflow-hidden rounded-xl border border-white/15 bg-surface">
              <div className="relative aspect-[258/120]">
                <Image src={cdn(m.image)} alt={m.title} fill sizes="(max-width: 640px) 100vw, 258px" className="object-cover" />
                {m.featured && (
                  <span className="absolute left-0 top-0 rounded-br-md bg-[#c2185b] px-2 py-0.5 font-cond text-xs font-bold uppercase">
                    Featured Post
                  </span>
                )}
                {cat && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-bg/90 px-2 py-0.5 font-cond text-[11px] font-bold uppercase">
                    {cat.name}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 text-base font-medium group-hover:underline">{m.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{m.description}</p>
                <span className="mt-1 inline-block text-xs font-bold text-[#4fc3f7] underline">Read More</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
