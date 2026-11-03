import Link from "next/link";
import type { ReactNode } from "react";

export function LinkButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const style =
    variant === "primary"
      ? "bg-berry text-white hover:bg-berry-dark"
      : "border border-line bg-white text-ink hover:bg-sand";
  return (
    <Link
      href={href}
      className={`inline-block rounded-xl px-5 py-2.5 text-center font-semibold transition-colors ${style}`}
    >
      {children}
    </Link>
  );
}
