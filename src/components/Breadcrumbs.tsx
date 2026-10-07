export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs font-medium ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((i, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {i.href ? (
              <a href={i.href} className="underline hover:text-link">
                {i.label}
              </a>
            ) : (
              <span aria-current="page">{i.label}</span>
            )}
            {idx < items.length - 1 && <span aria-hidden>&gt;</span>}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((i, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: i.label,
              ...(i.href ? { item: i.href.startsWith("http") ? i.href : `https://www.pogo.com${i.href}` } : {}),
            })),
          }),
        }}
      />
    </nav>
  );
}
