import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeaderboardAd, SkyscraperAd } from "@/components/HouseAd";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "trivial-pursuit-online" }];
}

export const metadata: Metadata = { title: "Trivial Pursuit Online — Play | Pogo" };

/**
 * PRUEBA: iframe exacto copiado de pogo.com/games/trivial-pursuit-online/play.
 * Se espera que Chrome lo bloquee por la CSP frame-ancestors de cdn-h5sdk.pogo.com
 * y porque el spikeAccessToken es de una sesión puntual.
 */
const GAME_SRC =
  "https://cdn-h5sdk.pogo.com/index.html?spikeAccessToken=MDNlYTNiNTgtZDJjZi00MzhiLTg4NmQtOThkZDE2MDgwYzAx.261007152002&gameHost=https://cdn-h5pie-prod.pogospike.com&apiHost=https://pogospike-prod.pogo.com&viewHost=https://cdn-h5sdk.pogo.com&suppressChallengeQueueFor=2&uaSubsOfferIntervalMins=5&challengePoints=true&challengeQueue2=true&challengeQueueImp=true&battlePass=true&rewardScreenConsolidation=true&chBoost=true&chat=true&tableChat=true&privateChat=true&clubUpsellUpdate=true&inGameGemCheckout=true&saveGuestProgress=false&inGameInviteReward=true&ungateRank=true&welcomeGuide=true&gameRecommendations=true&site=pogom&t=1791405788530&pogo2=true&chatFtueSeen=false&tableChatFtueSeen=false&gameAdsEnabled=true&venusHost=https://www.pogo.com";

export default async function PlayPage({ params }: PageProps<"/games/[slug]/play">) {
  const { slug } = await params;
  if (slug !== "trivial-pursuit-online") notFound();
  return (
    <div className="px-4 py-6">
      <LeaderboardAd className="mb-6" />
      <div className="flex gap-6">
        <div id="vm-game-wrapper" className="min-w-0 flex-1">
          <iframe
            name="gameBrick"
            title="Trivial Pursuit Online"
            src={GAME_SRC}
            allowFullScreen
            className="aspect-[1178/680] w-full border-0 bg-surface"
          />
        </div>
        <aside className="hidden w-[300px] shrink-0 xl:block">
          <SkyscraperAd />
        </aside>
      </div>
    </div>
  );
}
