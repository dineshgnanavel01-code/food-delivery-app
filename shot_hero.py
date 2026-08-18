from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=45000)
    pg.wait_for_timeout(3500)
    # removed fade-up kill
    pg.screenshot(path="/home/ubuntu/new_hero_1440.png")
    b.close()
    print("done")
