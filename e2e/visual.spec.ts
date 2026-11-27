import { expect, test } from "@playwright/test"

test("light and dark token surfaces differ", async ({ page }) => {
  await page.goto("/")
  const surface = page.locator("div.min-h-svh")
  await expect(surface).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await page.getByRole("button", { name: "Toggle theme" }).click()
  // The theme switches inside a view transition, after the click resolves.
  await expect(surface).toHaveCSS("background-color", "rgb(10, 10, 10)")
  await expect(page.getByRole("heading", { name: "Hatch e2e" })).not.toHaveCSS(
    "color",
    "rgb(255, 255, 255)",
  )
})
