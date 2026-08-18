from playwright.sync_api import sync_playwright

UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
BASE = "https://food-dina.vercel.app"
WIDTH = 427  # user's logical viewport (492px / ~1.15 DPR)
HEIGHT = 900

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(
        viewport={"width": WIDTH, "height": HEIGHT},
        device_scale_factor=2,
        is_mobile=False,
        has_touch=True,
        user_agent=UA,
    )
    pg = ctx.new_page()
    pg.goto(BASE + "/restaurant/r8", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(3000)
    pg.locator("h3", has_text="Truffle Mushroom").first.scroll_into_view_if_needed()
    pg.wait_for_timeout(400)
    pg.locator("text=Truffle Mushroom").first.click()
    pg.wait_for_timeout(2000)
    pg.get_by_role("button", name="Add to cart").first.click()
    pg.wait_for_timeout(1500)
    pg.goto(BASE + "/cart?v=round6", wait_until="domcontentloaded")
    pg.wait_for_timeout(3000)
    m = pg.evaluate("""
      () => {
        const vw = window.innerWidth;
        let worst = 0, worstEl = '';
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > worst) {
            worst = r.right;
            worstEl = el.tagName + '.' + String(el.className||'').slice(0,80);
          }
        });
        return { vw: Math.round(vw), worstRight: Math.round(worst),
          overflow: Math.round(worst - vw), worstEl, docW: document.documentElement.scrollWidth };
      }
    """)
    print(m)
    pg.screenshot(path="/home/ubuntu/live_427.png")
    b.close()
    print("done")
