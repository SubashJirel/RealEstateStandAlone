export function PlatformChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-light-border bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface shadow-low">
      {label}
    </span>
  );
}
