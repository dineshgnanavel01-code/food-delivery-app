from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 368, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    # populate cart like the user's screenshot
    pg.goto("https://food-dina.vercel.app/", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    pg.query_selector("main a[href*='/restaurant/']").click()
    pg.wait_for_timeout(2000)
    for i in range(2):
        pg.get_by_role("button", name="Add to cart").first.click()
        pg.wait_for_timeout(600)
    pg.goto("https://food-dina.vercel.app/cart?v=" + str(__import__("time").time_ns()), wait_until="domcontentloaded")
    pg.wait_for_timeout(3000)
    pg.add_style_tag(content="body * { transition: none !important; animation: none !important; }")
    pg.wait_for_timeout(400)
    pg.screenshot(path="/home/ubuntu/final_cart_header.png")
    b.close()
    print("done")
