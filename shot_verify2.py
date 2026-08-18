from playwright.sync_api import sync_playwright

UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 368, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    pg.goto("https://food-dina.vercel.app/cart", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(3000)
    pg.add_style_tag(content="body * { transition: none !important; animation: none !important; }")
    pg.wait_for_timeout(500)
    meas = pg.evaluate("""
      () => {
        const wrap = document.querySelector('main > div.mb-8');
        const span = wrap.querySelector('span');
        const h1 = wrap.querySelector('h1');
        const wrapR = wrap.getBoundingClientRect();
        const spanR = span.getBoundingClientRect();
        const h1R = h1.getBoundingClientRect();
        const vw = window.innerWidth;
        return {
          viewport: vw,
          wrap: {left: wrapR.left, right: wrapR.right, width: wrapR.width},
          eyebrowCenterOffset: (spanR.left + spanR.right)/2 - vw/2,
          h1CenterOffset: (h1R.left + h1R.right)/2 - vw/2,
          eyebrowTextAlign: getComputedStyle(wrap).textAlign,
          spanDisplay: getComputedStyle(span).display,
          h1Width: h1R.width
        };
      }
    """)
    print("MEASUREMENTS:", meas)
    pg.screenshot(path="/home/ubuntu/verify2_cart.png", full_page=True)
    b.close()
    print("done")
