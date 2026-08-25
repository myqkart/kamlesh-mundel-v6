type SheetDividerProps = {
  className?: string;
};

/** Loose ink squiggle — marks a page turn without a hard section rule. */
export function SheetDivider({ className = "" }: SheetDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none mx-auto flex w-full max-w-[90rem] justify-center px-[7vw] py-1 ${className}`}
    >
      <svg
        className="h-5 w-[min(100%,18rem)] text-teal-900/35"
        fill="none"
        viewBox="0 0 280 20"
      >
        <path
          d="M4 11c22-6 44 5 66-1 28-7 48 8 78 2 26-5 52 6 76 1 18-3 36 4 52 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <path
          d="M38 15c8-1 14 1 22 0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.1"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
