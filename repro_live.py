from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 427, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    # fresh incognito-like context: cache cleared by new context, but Vercel edge cache persists. Use cache-buster query
    pg.goto("https://food-dina.vercel.app/cart?v=round5", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(3000)
    m = pg.evaluate("""
      () => {
        const docW = document.documentElement.scrollWidth;
        const vw = window.innerWidth;
        let worst = 0, worstEl = '';
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          const right = r.right;
          if (r.width > 0 && right > worst) { worst = right; worstEl = el.tagName + '.' + (el.className||'').toString().slice(0,60); }
        });
        return { docW, vw, worstRight: Math.round(worst), overflow: Math.round(worst - vw), worstEl };
      }
    """)
    print(m)
    pg.screenshot(path="/home/ubuntu/repro_live.png")
    b.close()
