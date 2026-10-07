/**
 * Utilidades sin datos pesados: se pueden importar desde componentes cliente
 * sin meter los JSON de juegos/artículos en el bundle del navegador.
 */
import navCategoriesData from "@/data/navCategories.json";

export const POGO = "https://www.pogo.com";

export type Label = { type: string; copy: string };
export type Game = {
  code: string;
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  categories?: string[];
  playerCount?: number;
  labels?: Label[];
  authLevel?: string;
  forumLink?: string;
  img: { gameTile?: string; spotlightGame?: string; gameBackground?: string; eventTile?: string; spotlightMobile?: string };
};

export const navCategories = navCategoriesData as { id: string; name: string }[];

/**
 * Rutas replicadas y publicadas en este sitio. El resto enlaza al pogo.com original.
 * Se van activando a medida que cada página queda aprobada.
 */
export const LOCAL_PATHS = new Set<string>([
  "/",
  "/free-online-games/card",
  "/free-online-games/puzzle",
  "/games/trivial-pursuit-online",
  "/games/poppit-bingo",
  "/scrabble-strategy-pro-tips-for-every-skill-level",
  "/games-to-improve-vocabulary-fun-ways-to-boost-your-word-power",
]);

export function href(path: string): string {
  if (!path) return "#";
  if (/^https?:\/\//.test(path) || path.startsWith("//")) {
    const local = path.replace(/^https?:\/\/www\.pogo\.com/, "");
    return LOCAL_PATHS.has(local) ? local : path;
  }
  return LOCAL_PATHS.has(path) ? path : POGO + path;
}

export const isExternal = (h: string) => /^https?:\/\//.test(h);

/** URL absoluta de un asset del CDN de Pogo */
export function cdn(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("//")) return "https:" + path;
  return POGO + path;
}

export const LOGO = cdn("/static/v2/media/library/assets/pogoLogo__3Zqbx.svg");

export function categorySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
export function categoryHref(name: string): string {
  if (name === "Club Pogo") return href("/premium-online-games/club-pogo");
  return href("/free-online-games/" + categorySlug(name));
}

