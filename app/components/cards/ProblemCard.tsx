const icons: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  notes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  clock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

interface ProblemCardProps {
  title: string;
  description: string;
  icon: string;
}

export function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <article className="card-hover rounded-xl border border-light-border bg-surface-container-lowest p-6 shadow-low">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0eb] text-[#e07a5f]">
        {icons[icon]}
      </div>
      <h3 className="headline-md text-lg font-semibold text-on-surface">{title}</h3>
      <p className="body-sm mt-2 text-on-surface-variant">{description}</p>
    </article>
  );
}
