import Image from "next/image";
import { games, cdn, href, POGO } from "@/lib/pogo";
import Carousel from "./Carousel";
import { CoinIcon } from "./icons";

/** Retos destacados en la home (en pogo.com cambian a diario; aquí se muestran los capturados) */
const challenges = [
  { code: "pegasus_h5", left: "14H LEFT", task: "Collect 2 red threes", reward: "100", tags: ["DAILY", "CLUB"], cta: "Try it Free" },
  { code: "nanaimobar_h5", left: "14H LEFT", task: "Remove 100 Sun blocks (yellow when using regular color mode)", reward: "100", tags: ["DAILY", "FREE"], cta: "Register Free" },
  { code: "wheel_h5", left: "14H LEFT", task: "Win 3 regular rounds without missing a consonant or vowel.", reward: "100", tags: ["DAILY", "FREE"], cta: "Register Free" },
  { code: "mergeacademy_h5", left: "6D LEFT", task: "Complete 10 orders in classic mode or grid event this week!", reward: "400", badge: "Dark Cloak Badge", tags: ["WEEKLY", "FREE"], cta: "Register Free" },
];

const tagColor: Record<string, string> = {
  DAILY: "bg-label-event",
  WEEKLY: "bg-label-event",
  FREE: "bg-[#1f6fd6]",
  CLUB: "bg-label-club",
};

export default function Challenges({ title }: { title: string }) {
  return (
    <section className="my-6 bg-[#3a1d3f] py-6">
      <div className="mb-4 px-6 md:px-14">
        <h2 className="text-xl font-medium md:text-[22px]">{title}</h2>
        <p className="text-sm">
          <a href={`${POGO}/server/auth/register`} className="font-bold underline">
            Sign up now for FREE
          </a>{" "}
          to start completing Challenges to earn Badges and in-game rewards.
        </p>
      </div>
      <Carousel itemClass="w-[70vw] sm:w-[312px]" gap="gap-4">
        {challenges.map((c) => {
          const g = games[c.code];
          return (
            <article key={c.code} className="overflow-hidden rounded-lg bg-surface">
              <div className="relative aspect-[312/260]">
                {g?.img.eventTile && <Image src={cdn(g.img.eventTile)} alt={g.name} fill sizes="312px" className="object-cover" />}
                <span className="absolute left-2 top-2 rounded bg-bg/80 px-2 py-0.5 font-cond text-xs font-bold">◷ {c.left}</span>
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bg/70 text-xs font-bold">i</span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent pb-2 pt-6 text-center font-cond">
                  <p className="text-xs font-bold uppercase text-muted">Rewards</p>
                  <p className="flex items-center justify-center gap-1 text-sm font-bold">
                    <span className="text-[#f6c344]">★</span> {c.reward}
                    {c.badge && (
                      <>
                        <CoinIcon /> <span className="uppercase">{c.badge}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="p-3">
                <div className="mb-1 flex gap-1">
                  {c.tags.map((t) => (
                    <span key={t} className={`rounded-full px-2 font-cond text-[11px] font-bold ${tagColor[t]}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium">{g?.name}</h3>
                <p className="min-h-[34px] text-xs leading-tight text-muted">{c.task}</p>
                <div className="mt-3 flex justify-center">
                  <a
                    href={c.cta === "Try it Free" ? href(g?.slug ?? "/") : `${POGO}/server/auth/register`}
                    className="btn-primary inline-flex h-9 items-center rounded-md px-6 font-cond text-sm font-medium uppercase"
                  >
                    {c.cta}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </Carousel>
    </section>
  );
}
