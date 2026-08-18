"""Capture mobile-viewport screenshots of the Dina Food app pages."""
import sys
from playwright.sync_api import sync_playwright

PAGES = ["/", "/restaurants", "/restaurant/r1", "/cart", "/checkout"]
W = 390
FULL = len(sys.argv) > 1 and sys.argv[1] == "--full"

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": W, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        page = ctx.new_page()
        for path in PAGES:
            page.goto("http://localhost:3000" + path, wait_until="domcontentloaded")
            page.wait_for_timeout(1500)
            safe = path.strip("/").replace("/", "_") or "home"
            page.screenshot(path=f"/home/ubuntu/mobile_{safe}.png")
            if FULL:
                page.screenshot(path=f"/home/ubuntu/mobile_{safe}_full.png", full_page=True)
            # report scroll width vs viewport
            info = page.evaluate(
                "JSON.stringify({doc: document.documentElement.scrollWidth, vw: window.innerWidth})"
            )
            print(safe, info)
        browser.close()

if __name__ == "__main__":
    main()
