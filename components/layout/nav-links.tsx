"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation, type NavIcon } from "./navigation";

const iconPaths: Record<NavIcon, string> = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v10h13V10",
  chat: "M4 5h16v11H9l-5 4V5Z",
  games: "M7 8h10a4 4 0 0 1 4 4v3a2.5 2.5 0 0 1-4.6 1.3L15 14H9l-1.4 2.3A2.5 2.5 0 0 1 3 15v-3a4 4 0 0 1 4-4Z",
  shop: "M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
};

export function NavLinks({ layout }: { layout: "sidebar" | "bar" }) {
  const pathname = usePathname();
  const isSidebar = layout === "sidebar";

  return (
    <ul className={isSidebar ? "flex flex-col gap-1" : "grid grid-cols-5"}>
      {mainNavigation.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "flex items-center rounded-xl font-semibold transition-colors",
                isSidebar
                  ? "gap-3 px-3 py-2.5 text-sm"
                  : "min-h-14 flex-col justify-center gap-1 text-xs",
                active ? "bg-peach text-berry-dark" : "text-muted hover:bg-sand",
              ].join(" ")}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={iconPaths[item.icon]} />
              </svg>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
