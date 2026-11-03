import type { ReactNode } from "react";

export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-6 max-w-2xl">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-2 leading-relaxed text-muted">{intro}</p>
    </div>
  );
}

export function Card({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      {title || badge ? (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {title ? <h2 className="text-lg font-bold">{title}</h2> : null}
          {badge}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function SampleBadge() {
  return (
    <span className="rounded-full bg-lilac px-2.5 py-0.5 text-xs font-semibold text-ink">
      Sample data
    </span>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
      {children}
    </p>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line px-4 py-8 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

/** A real, disabled control. Features that do not work yet must never look active. */
export function UnavailableButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      className="cursor-not-allowed rounded-xl bg-sand px-4 py-2 text-sm font-semibold text-muted"
    >
      {children}
    </button>
  );
}
