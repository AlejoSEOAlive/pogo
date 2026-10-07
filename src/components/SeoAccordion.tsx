/** Bloque SEO plegable al final de las categorías (como pogo.com) */
export default function SeoAccordion({ title, html }: { title: string; html: string }) {
  return (
    <details className="group mt-8">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xl font-medium [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform group-open:rotate-180" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="prose-pogo prose-game pb-6" dangerouslySetInnerHTML={{ __html: html }} />
    </details>
  );
}
