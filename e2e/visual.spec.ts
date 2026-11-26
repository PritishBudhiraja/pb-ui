import { expect, test } from "@playwright/test"

test("light and dark token surfaces differ", async ({ page }) => {
  await page.goto("/")
  const surface = page.locator("div.min-h-svh")
  const light = await surface.evaluate((node) => getComputedStyle(node).backgroundColor)
  await page.getByRole("button", { name: "Toggle theme" }).click()
  const dark = await surface.evaluate((node) => getComputedStyle(node).backgroundColor)
  const foreground = await page
    .getByRole("heading", { name: "Hatch e2e" })
    .evaluate((node) => getComputedStyle(node).color)
  expect(light).toBe("rgb(255, 255, 255)")
  expect(dark).toBe("rgb(10, 10, 10)")
  expect(foreground).not.toBe(light)
})
