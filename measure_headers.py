"""Measure page-header centering on the deployed site at the user's 368px viewport."""
from playwright.sync_api import sync_playwright

UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
BASE = "https://food-dina.vercel.app"

PAGES = {
    "/": "home",
    "/cart": "cart",
    "/checkout": "checkout",
    "/restaurants": "restaurants",
}

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(
        viewport={"width": 368, "height": 814},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent=UA,
    )
    pg = ctx.new_page()
    results = {}
    for path, name in PAGES.items():
        pg.goto(BASE + path + "?v=" + str(__import__("time").time_ns()),
                wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(3000)
        pg.add_style_tag(content="body * { transition: none !important; animation: none !important; }")
        pg.wait_for_timeout(400)
        meas = pg.evaluate("""
          () => {
            // find first h1-like header inside main
            const main = document.querySelector('main');
            if (!main) return {error: 'no main'};
            const h = main.querySelector('h1, h2');
            if (!h) return {error: 'no heading'};
            const wrap = h.parentElement.closest('div');
            const hR = h.getBoundingClientRect();
            const vw = window.innerWidth;
            const wrapAlign = getComputedStyle(hR.width >= 0 ? h.parentElement : h).textAlign;
            return {
              heading: h.textContent.trim().slice(0, 40),
              viewport: vw,
              headingCenterOffset: Math.round((hR.left + hR.right)/2 - vw/2),
              hLeft: Math.round(hR.left),
              wrapTextAlign: getComputedStyle(h.parentElement).textAlign,
            };
          }
        """)
        results[name] = meas
        print(name, meas)
    b.close()
