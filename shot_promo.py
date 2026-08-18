"""Screenshot the promo ticket band region on mobile."""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    page = ctx.new_page()
    page.goto("http://localhost:3000/", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    band = page.query_selector(".ticket")
    band.screenshot(path="/home/ubuntu/promo_band.png")
    print("done")
    browser.close()
