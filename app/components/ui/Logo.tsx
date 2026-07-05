import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary-container"
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </span>
      <span className="text-base font-semibold leading-none">
        <span className="text-charcoal">Nexora </span>
        <span className="text-deep-sage">RealtyOS</span>
      </span>
    </Link>
  );
}
