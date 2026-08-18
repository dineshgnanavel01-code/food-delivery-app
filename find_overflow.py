from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 375, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    pg.goto("http://localhost:3000/restaurant/r8", wait_until="domcontentloaded", timeout=45000)
    pg.wait_for_timeout(1500)
    pg.locator("h3", has_text="Truffle Mushroom").first.scroll_into_view_if_needed()
    pg.wait_for_timeout(400)
    pg.locator("text=Truffle Mushroom").first.click()
    pg.wait_for_timeout(1500)
    pg.get_by_role("button", name="Add to cart").first.click()
    pg.wait_for_timeout(800)
    pg.goto("http://localhost:3000/cart", wait_until="domcontentloaded")
    pg.wait_for_timeout(2000)
    m = pg.evaluate("""
      () => {
        const vw = window.innerWidth;
        const out = [];
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > vw + 2) {
            out.push({ tag: el.tagName, cls: String(el.className||'').slice(0,70), right: Math.round(r.right), w: Math.round(r.width), text: (el.innerText||'').slice(0,22).replace(/\\n/g,' ') });
          }
        });
        return out;
      }
    """)
    for x in m:
        print(x)
    b.close()
