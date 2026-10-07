import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Carga contenido editorial largo desde /content/<tipo>/<slug>.md
 * (Markdown o HTML pegado tal cual). Las líneas con [[PENDIENTE]] se
 * muestran resaltadas para saber qué texto falta pegar.
 */
export function loadContent(kind: "articles" | "games" | "categories", slug: string): string | null {
  const file = path.join(process.cwd(), "content", kind, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const html = marked.parse(raw, { async: false, gfm: true }) as string;
  return html.replace(/<p>\s*\[\[PENDIENTE\]\]([\s\S]*?)<\/p>/g, '<p class="pending">$1</p>');
}
