import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { mainNavigation } from "@/components/layout/navigation";

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });

describe("main navigation", () => {
  it("offers the five approved sections in order", () => {
    expect(mainNavigation.map((item) => item.label)).toEqual([
      "Home",
      "Chat",
      "Games",
      "Shop",
      "Profile",
    ]);
  });

  it("points every item at a real page", () => {
    const missing = mainNavigation
      .map((item) => join("app/(main)", item.href, "page.tsx"))
      .filter((path) => !existsSync(path));
    expect(missing).toEqual([]);
  });
});

describe("sample data", () => {
  it("stays out of business logic", () => {
    const offenders = ["services", "features", "lib/ai", "lib/supabase"]
      .flatMap(sourceFiles)
      .filter((file) => readFileSync(file, "utf8").includes("lib/mock"));
    expect(offenders).toEqual([]);
  });

  it("is labelled on every page that uses it", () => {
    const unlabelled = sourceFiles("app")
      .filter((file) => readFileSync(file, "utf8").includes("lib/mock"))
      .filter((file) => !readFileSync(file, "utf8").includes("SampleBadge"));
    expect(unlabelled).toEqual([]);
  });
});
