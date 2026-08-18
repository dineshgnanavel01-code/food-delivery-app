from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    for vw, name in [(368, "fix_368b"), (427, "fix_427b")]:
        ctx = b.new_context(viewport={"width": vw, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
        pg = ctx.new_page()
        pg.goto("https://food-dina.vercel.app/cart", wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(1000)
        pg.goto("https://food-dina.vercel.app/", wait_until="domcontentloaded")
        pg.wait_for_timeout(2000)
        pg.query_selector("main a[href*='/restaurant/']").click()
        pg.wait_for_timeout(2000)
        pg.get_by_role("button", name="Add to cart").first.click()
        pg.wait_for_timeout(600)
        pg.reload(wait_until="domcontentloaded")
        pg.wait_for_timeout(2000)
        pg.add_style_tag(content="body * { transition: none !important; animation: none !important; }")
        pg.wait_for_timeout(400)
        m = pg.evaluate("""
          () => {
            const vw = window.innerWidth;
            let worst = 0, worstEl='';
            document.querySelectorAll('main *').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.bottom < 0) return;
              if (r.right > worst && r.top < 1000) { worst = r.right; worstEl = (el.tagName + '.' + (el.className||'').toString().slice(0,50)); }
            });
            return {vw, worstRight: Math.round(worst), worstEl, overflow: Math.round(worst - vw)};
          }
        """)
        print(name, m)
        pg.screenshot(path=f"/home/ubuntu/{name}.png")
        ctx.close()
    b.close()
    print("done")
