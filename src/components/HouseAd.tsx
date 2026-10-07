import { cdn, href } from "@/lib/links";

const AD = "/static/v2/media/src/components/ads/static/houseAd/";
const src = {
  "300x600": cdn(AD + "ad-300x600__16uZY.jpg"),
  "970x90": cdn(AD + "ad-970x90__2fGkd.jpg"),
  "728x90": cdn(AD + "ad-728x90__1sPA9.jpg"),
  "320x50": cdn(AD + "ad-320x50__386tV.jpg"),
};

/** Banners propios de Pogo (Club Pogo / Ad-Free) que se muestran a invitados en las páginas de juego */
export function LeaderboardAd({ className = "" }: { className?: string }) {
  return (
    <a href={href("/club-pogo")} aria-label="Enjoy Ad-Free Gameplay – Learn more" className={`mx-auto block w-fit ${className}`}>
      <picture>
        <source media="(min-width: 1024px)" srcSet={src["970x90"]} width={970} height={90} />
        <source media="(min-width: 768px)" srcSet={src["728x90"]} width={728} height={90} />
        <img src={src["320x50"]} alt="Club Pogo – Enjoy Ad-Free Gameplay" width={320} height={50} loading="lazy" className="h-auto max-w-full" />
      </picture>
    </a>
  );
}

export function SkyscraperAd({ className = "" }: { className?: string }) {
  return (
    <a href={href("/club-pogo")} aria-label="Ad-Free Gameplay Two-Day Trial – Learn more" className={`block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src["300x600"]} alt="Pogo – Ad-Free Gameplay Two-Day Trial" width={300} height={600} loading="lazy" />
    </a>
  );
}
