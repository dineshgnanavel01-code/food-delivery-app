from playwright.sync_api import sync_playwright
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 427, "height": 814}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA)
    pg = ctx.new_page()
    pg.goto("https://food-dina.vercel.app/", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    pg.query_selector("main a[href*='/restaurant/']").click()
    pg.wait_for_timeout(2500)
    pg.get_by_role("button", name="Add to cart").first.click()
    pg.wait_for_timeout(800)
    pg.goto("https://food-dina.vercel.app/cart", wait_until="domcontentloaded")
    pg.wait_for_timeout(2500)
    # measure images used by cart item card and order summary row
    m = pg.evaluate("""
      () => {
        const imgs = Array.from(document.querySelectorAll('img')).map(i => ({
          src: i.getAttribute('src'),
          alt: i.alt,
          r: i.getBoundingClientRect()
        })).filter(i => i.r.top > 150 && i.r.top < 1000);
        return imgs;
      }
    """)
    for i in m:
        print(i['src'], '|', i['alt'], '| y=', round(i['r']['top']))
    pg.screenshot(path="/home/ubuntu/imgs_427.png")
    b.close()
    print("done")
