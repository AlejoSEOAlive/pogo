export default function JumpTo({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Jump to" className="px-6 py-8 md:px-14">
      <ul className="no-scrollbar flex items-center gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">
        <li className="shrink-0 pr-4 text-xl font-medium md:pl-4">Jump to</li>
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              className="flex h-10 items-center rounded-3xl border-2 border-transparent bg-surface px-4 text-base hover:border-link"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
