import Link from "next/link";
import type { ReactNode } from "react";
import { NavLinks } from "./nav-links";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-line bg-white/70 p-4 md:flex md:flex-col md:gap-6">
        <Link href="/" className="px-3 text-lg font-extrabold tracking-tight">
          My Talking Man
        </Link>
        <nav aria-label="Main">
          <NavLinks layout="sidebar" />
        </nav>
        <p className="mt-auto px-3 text-xs leading-relaxed text-muted">
          He will be a fictional AI character, not a real person.
        </p>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-white/70 px-4 py-3 md:px-8">
          <Link href="/" className="font-extrabold tracking-tight md:hidden">
            My Talking Man
          </Link>
          <p className="text-sm font-semibold text-muted md:ml-auto">
            Coins: <span aria-label="not available yet">—</span>
          </p>
        </header>
        <main id="content" className="flex-1 px-4 pt-6 pb-24 md:px-8 md:pb-8">
          {children}
        </main>
      </div>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white px-1 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <NavLinks layout="bar" />
      </nav>
    </div>
  );
}
