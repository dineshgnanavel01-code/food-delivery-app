from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
PAGES = {"/": "home", "/cart": "cart", "/checkout": "checkout", "/restaurants": "restaurants"}
WIDTHS = [368, 768]

with sync_playwright() as p:
    b = p.chromium.launch()
    for vw in WIDTHS:
        ctx = b.new_context(viewport={"width": vw, "height": 814})
        pg = ctx.new_page()
        print(f"--- {vw}px ---")
        for path, name in PAGES.items():
            pg.goto(BASE + path, wait_until="domcontentloaded", timeout=60000)
            pg.wait_for_timeout(1500)
            meas = pg.evaluate("""
              () => {
                const main = document.querySelector('main');
                if (!main) return {error: 'no main'};
                const h = main.querySelector('h1, h2');
                if (!h) return {error: 'no heading'};
                const hR = h.getBoundingClientRect();
                const vw = window.innerWidth;
                return {
                  heading: h.textContent.trim().slice(0,35),
                  centerOffset: Math.round((hR.left+hR.right)/2 - vw/2),
                  align: getComputedStyle(h.parentElement).textAlign
                };
              }
            """)
            print(name, meas)
        ctx.close()
    b.close()
