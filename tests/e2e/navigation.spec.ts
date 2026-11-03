import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/login",
  "/register",
  "/onboarding",
  "/home",
  "/chat",
  "/games",
  "/shop",
  "/shop?tab=inventory",
  "/profile",
];

for (const route of routes) {
  test(`${route} loads cleanly without horizontal scrolling`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
    expect(errors).toEqual([]);
  });
}

test("main navigation reaches each section and marks the current page", async ({ page }) => {
  await page.goto("/home");
  const nav = page.getByRole("navigation", { name: "Main" }).locator("visible=true");

  for (const label of ["Chat", "Games", "Shop", "Profile", "Home"]) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}`));
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
  }
});

test("unknown pages show the not-found state", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("unbuilt actions are disabled and no photo can be uploaded", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page.getByRole("button", { name: "Start" })).toBeDisabled();
  await expect(page.locator('input[type="file"]')).toHaveCount(0);

  await page.goto("/chat");
  await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();

  await page.goto("/shop");
  await expect(page.getByRole("button", { name: "Buy" }).first()).toBeDisabled();
});

test("Home shows no stand-in character", async ({ page }) => {
  await page.goto("/home");
  await expect(page.getByRole("heading", { name: "No character yet" })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
