import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

const envEntries = read(".env.example")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const separator = line.indexOf("=");
    return { name: line.slice(0, separator), value: line.slice(separator + 1) };
  });

describe("secret handling", () => {
  it("leaves every credential blank in .env.example", () => {
    const credentials = envEntries.filter(({ name }) =>
      /(KEY|SECRET|TOKEN|PASSWORD)$/.test(name),
    );
    expect(credentials.length).toBeGreaterThan(0);
    expect(credentials.filter(({ value }) => value !== "")).toEqual([]);
  });

  it("never exposes a secret through a NEXT_PUBLIC_ variable", () => {
    const exposed = envEntries
      .map(({ name }) => name)
      .filter((name) => name.startsWith("NEXT_PUBLIC_"))
      .filter((name) => /SECRET|SERVICE|TOKEN|PASSWORD|AI_/.test(name));
    expect(exposed).toEqual([]);
  });

  it("ignores local env files but keeps the example", () => {
    const ignored = read(".gitignore").split("\n");
    expect(ignored).toContain(".env");
    expect(ignored).toContain(".env.*");
    expect(ignored).toContain("!.env.example");
  });
});
