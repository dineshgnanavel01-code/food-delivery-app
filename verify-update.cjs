const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const widths = [375, 768, 1280];
  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w, height: 812 },
      deviceScaleFactor: 1,
    });
    await page.goto("http://localhost:3002/dishes", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // 1) Check no horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        overflows: Math.max(0, doc.scrollWidth - doc.clientWidth),
      };
    });
    console.log(`[${w}px] /dishes overflow: ${overflow.overflows}px`);

    // 2) Count dish cards rendered
    const grid = await page.locator("main.grid, main .grid").first();
    const cards = await page.locator("img").count();
    console.log(`[${w}px] image cards on Dishes page: ${cards}`);

    // 3) Verify all new restaurant names + Tamil Nadu locations appear
    const locText = await page.textContent("body");
    const checks = [
      ["Spice Garden", "Salem"],
      ["The Tandoor House", "Omalur"],
      ["Punjab Da Dhaba", "Mettur"],
      ["Chennai Chettinad", "Tharamangalam"],
      ["Mumbai Street Chaat", ""],
      ["Mithai Junction", ""],
      ["Goa Fish Curry Co.", ""],
      ["Royal Mughlai Kitchen", ""],
    ];
    const navOk = await page.locator("nav a:has-text('Dishes')").count();
    for (const [name] of checks) {
      const cnt = await page.getByText(name, { exact: false }).count();
      if (cnt === 0) console.log(`  MISSING name: ${name}`);
    }
    for (const [, loc] of checks) {
      if (loc) {
        const cnt = await page.getByText(loc).count();
        if (cnt === 0) console.log(`  MISSING location: ${loc}`);
      }
    }
    console.log(`[${w}px] Dishes nav link present: ${navOk > 0} (count ${navOk})`);

    // 4) Screenshot for visual check
    await page.screenshot({
      path: `/home/ubuntu/food-delivery-app/verify-dishes-${w}px.png`,
    });

    await page.close();
  }

  // Second pass: Restaurants page — locations and new images
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto("http://localhost:3002/restaurants", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  for (const loc of ["Salem", "Omalur", "Mettur", "Tharamangalam"]) {
    const cnt = await page.getByText(loc).count();
    console.log(`Restaurants page '${loc}' occurrences: ${cnt}`);
  }
  const indianImgs = await page.evaluate(() =>
    [...document.querySelectorAll("img")].filter((i) =>
      i.src.includes("/images/indian-"),
    ).length,
  );
  console.log(`Restaurants page indian-* images: ${indianImgs}`);
  await page.screenshot({ path: "/home/ubuntu/food-delivery-app/verify-restaurants-375px.png" });
  await page.close();

  // Third pass: Home page hero and image check
  const home = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await home.goto("http://localhost:3002/", { waitUntil: "networkidle" });
  await home.waitForTimeout(800);
  const homeImgs = await home.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => i.src).filter((s) => s.includes("/images/")),
  );
  console.log("Home page images:", homeImgs);
  await home.screenshot({ path: "/home/ubuntu/food-delivery-app/verify-home-375px.png" });
  await home.close();

  await browser.close();
  console.log("DONE");
})();
