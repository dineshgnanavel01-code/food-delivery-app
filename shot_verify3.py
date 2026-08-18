from playwright.sync_api import sync_playwright

UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 368, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    pg.add_init_script("window.scrollTo(0,0)")
    pg.goto("https://food-dina.vercel.app/cart", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    pg.evaluate("window.scrollTo(0,0)")
    pg.wait_for_timeout(500)
    pg.add_style_tag(content="body * { transition: none !important; animation: none !important; }")
    pg.wait_for_timeout(300)
    pg.screenshot(path="/home/ubuntu/verify3_header.png")
    meas = pg.evaluate("""
      () => {
        const wrap = document.querySelector('main > div.mb-8');
        if (!wrap) return {error: 'no header'};
        const span = wrap.querySelector('span');
        const h1 = wrap.querySelector('h1');
        const vw = window.innerWidth;
        const sR = span.getBoundingClientRect();
        const hR = h1.getBoundingClientRect();
        return {
          eyebrowCenterOffset: Math.round((sR.left + sR.right)/2 - vw/2),
          h1CenterOffset: Math.round((hR.left + hR.right)/2 - vw/2),
          textAlign: getComputedStyle(wrap).textAlign
        };
      }
    """)
    print("MEASUREMENTS:", meas)
    b.close()
    print("done")
