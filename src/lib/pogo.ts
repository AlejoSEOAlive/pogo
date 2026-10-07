import gamesData from "@/data/games.json";
import homeData from "@/data/home.json";
import categoriesData from "@/data/categories.json";
import gamePagesData from "@/data/gamePages.json";
import articlesData from "@/data/articles.json";
import blogCategoriesData from "@/data/blogCategories.json";
import type { Game } from "./links";

export * from "./links";


export const games = gamesData as unknown as Record<string, Game>;
export const home = homeData;
export const categories = categoriesData as unknown as Record<
  string,
  {
    id: string;
    name: string;
    games: string[];
    spotlight?: string | null;
    forumLink?: string;
    seo: { title?: string; metaDescription?: string; h1?: string; h2?: string; accordionTitle?: string };
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

export function getGames(codes: string[]): Game[] {
  return codes.map((c) => games[c]).filter(Boolean);
}
