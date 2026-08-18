from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in [320, 375]:
        ctx = b.new_context(viewport={"width": w, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
        pg = ctx.new_page()
        pg.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=45000)
        pg.wait_for_timeout(2500)
        m = pg.evaluate("""
          () => {
            const vw = window.innerWidth;
            let worst = 0;
            document.querySelectorAll('body *').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.right > worst) worst = r.right;
            });
            return { vw, overflow: Math.round(worst - vw) };
          }
        """)
        print(w, m)
        pg.screenshot(path=f"/home/ubuntu/home_{w}.png")
        pg.close(); ctx.close()
    b.close()
