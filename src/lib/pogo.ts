import gamesData from "@/data/games.json";
import homeData from "@/data/home.json";
import navCategoriesData from "@/data/navCategories.json";
import categoriesData from "@/data/categories.json";
import gamePagesData from "@/data/gamePages.json";
import articlesData from "@/data/articles.json";
import blogCategoriesData from "@/data/blogCategories.json";

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

export const games = gamesData as unknown as Record<string, Game>;
export const home = homeData;
export const navCategories = navCategoriesData as { id: string; name: string }[];
export const categories = categoriesData as unknown as Record<
  string,
  {
    id: string;
    name: string;
    games: string[];
    spotlight?: string | null;
    forumLink?: string;
    seo: { title?: string; metaDescription?: string; h1?: string; h2?: string };
  }
>;
export type GamePage = {
  slug: string;
  h1: string;
  tagLine: string;
  title: string;
  metaDescription: string;
  forumLink?: string;
  categories: string[];
  related: string[];
  screenshots: string[];
  breadcrumbCategory: string;
};
export const gamePages = gamePagesData as unknown as Record<string, GamePage>;
export type MoreArticle = { path: string; title: string; description: string; image: string; featured?: boolean; categoryIds?: string[] };
export type Article = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  description: string;
  image: string;
  imageAltText?: string;
  author: string;
  publishDate: number;
  categoryIds: string[];
  keywords: string[];
  more: MoreArticle[];
};
export const articles = articlesData as unknown as Record<string, Article>;
export const blogCategories = blogCategoriesData as { path: string; categoryId: string; name: string }[];

/**
 * Rutas replicadas y publicadas en este sitio. El resto enlaza al pogo.com original.
 * Se van activando a medida que cada página queda aprobada.
 */
export const LOCAL_PATHS = new Set<string>([
  "/",
  // "/free-online-games/card",
  // "/free-online-games/puzzle",
  // "/games/trivial-pursuit-online",
  // "/games/poppit-bingo",
  // ...Object.keys(articles).map((s) => "/" + s),
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

export function getGames(codes: string[]): Game[] {
  return codes.map((c) => games[c]).filter(Boolean);
}
