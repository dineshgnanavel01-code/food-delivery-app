from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    pg = ctx.new_page()
    for path, name in [("/", "home"), ("/cart", "cart")]:
        pg.goto("http://localhost:3000" + path, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(1500)
        m = pg.evaluate("""
          () => {
            const main = document.querySelector('main');
            const h = main.querySelector('h1, h2');
            const hR = h.getBoundingClientRect();
            const vw = window.innerWidth;
            return {heading: h.textContent.trim().slice(0,35), centerOffset: Math.round((hR.left+hR.right)/2 - vw/2), align: getComputedStyle(h.parentElement).textAlign};
          }
        """)
        print(name, m)
    b.close()
