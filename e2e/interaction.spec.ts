import { expect, test } from "@playwright/test"

test("serif heading, theme tokens, editor and calendar", async ({ page }) => {
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

  const surface = page.locator("div.min-h-svh")
  await expect(surface).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await page.getByRole("button", { name: "Toggle theme" }).click()
  // The theme switches inside a view transition, after the click resolves.
  await expect(surface).toHaveCSS("background-color", "rgb(10, 10, 10)")
  await expect(heading).not.toHaveCSS("color", "rgb(255, 255, 255)")

  await page.getByLabel("Editor").click()
  await page.keyboard.type("Typed in TipTap")
  await expect(page.getByLabel("Editor")).toContainText("Typed in TipTap")

  await page.getByRole("button", { name: /Monday, November 23, 2026, 11:00/ }).click()
  await expect(page.getByRole("button", { name: /^Slot, 11:00/ })).toBeVisible()
  expect(errors.filter((message) => !message.includes("not implemented"))).toEqual([])
})
