from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 368, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
    pg = ctx.new_page()
    # Simulate items in cart via localStorage/session - instead, add items through the UI first: go to a restaurant and add items
    pg.goto("https://food-dina.vercel.app/", wait_until="domcontentloaded")
    pg.wait_for_timeout(2500)
    # Click a restaurant card
    card = pg.query_selector("main a[href*='/restaurant/']")
    card.click()
    pg.wait_for_timeout(2000)
    # Find "Add to cart" buttons
    pg.wait_for_timeout(1500)
    pg.get_by_role("button", name="Add to cart").first.click()
    pg.wait_for_timeout(800)
    pg.get_by_role("button", name="Add to cart").first.click()
    pg.wait_for_timeout(800)
    pg.goto("https://food-dina.vercel.app/cart", wait_until="domcontentloaded")
    pg.wait_for_timeout(2500)
    pg.screenshot(path="/home/ubuntu/user_cart.png", full_page=True)
    pg.evaluate("window.scrollTo(0,0)")
    pg.wait_for_timeout(300)
    pg.screenshot(path="/home/ubuntu/user_cart_top.png")
    # measure header block
    meas = pg.evaluate("""
      () => {
        const d = document.querySelector('main > div.mb-8');
        const r = d.getBoundingClientRect();
        return {blockWidth: r.width, blockLeft: r.left, viewport: window.innerWidth};
      }
    """)
    print("MEASURE:", meas)
    b.close()
    print("done")
