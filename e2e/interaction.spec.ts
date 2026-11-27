import { expect, test } from "@playwright/test"

test("editor, calendar, theme, and serif", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })

  await page.goto("/")
  const heading = page.getByRole("heading", { name: "Hatch e2e" })
  await expect(heading).toBeVisible()
  const family = await heading.evaluate((node) => getComputedStyle(node).fontFamily)
  expect(family).toMatch(/Instrument Serif|Georgia/i)

  const lightBg = await page
    .locator("div.min-h-svh")
    .evaluate((node) => getComputedStyle(node).backgroundColor)
  await page.getByRole("button", { name: "Toggle theme" }).click()
  const darkBg = await page
    .locator("div.min-h-svh")
    .evaluate((node) => getComputedStyle(node).backgroundColor)
  expect(darkBg).not.toBe(lightBg)

  await page.getByLabel("Editor").click()
  await page.keyboard.type("Typed in TipTap")
  await expect(page.getByLabel("Editor")).toContainText("Typed in TipTap")

  await page.getByRole("button", { name: /Monday, November 23, 2026, 11:00/ }).click()
  await expect(page.getByRole("button", { name: /^Slot, 11:00/ })).toBeVisible()
  expect(errors.filter((message) => !message.includes("not implemented"))).toEqual([])
})
