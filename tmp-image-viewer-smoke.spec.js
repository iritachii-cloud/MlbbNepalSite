const { test, expect } = require("@playwright/test");

test("image viewer opens from archive profile images", async ({ page }) => {
  for (const item of [
    ["hero-card/index.html", ".hero-card", "#mainHeroImage"],
    ["creep-card/index.html", ".creep-card", "#mainCreepImage"],
    ["npc-card/index.html", ".npc-card", "#mainNpcImage"]
  ]) {
    await page.goto(`http://localhost:4177/${item[0]}`);
    await page.locator(item[1]).first().click();
    await page.locator(item[2]).click();
    await expect(page.locator(".image-viewer.show")).toBeVisible();
    await expect(page.locator("#imageViewerCount")).not.toHaveText("");
    await page.locator("#imageViewerNext").click();
    await page.locator("#imageViewerClose").click();
    await expect(page.locator(".image-viewer.show")).toHaveCount(0);
  }
});
