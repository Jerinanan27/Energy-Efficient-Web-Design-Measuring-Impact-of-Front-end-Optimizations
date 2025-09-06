#!/usr/bin/env python3
import argparse, sys, time, random
from datetime import datetime
from contextlib import suppress

from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FFService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def log(msg): print(f"[browse_variant] {msg}", flush=True)

def wait_css(driver, sel, t=8):
    return WebDriverWait(driver, t).until(EC.presence_of_element_located((By.CSS_SELECTOR, sel)))

def safe_click(driver, sel, t=3):
    with suppress(Exception):
        el = WebDriverWait(driver, t).until(EC.element_to_be_clickable((By.CSS_SELECTOR, sel)))
        driver.execute_script("arguments[0].scrollIntoView({block:'center'});", el)
        el.click()
        return True
    return False

def smooth_scroll(driver, px, steps=6, pause=0.07):
    s = int(px/steps) if steps>0 else px
    for _ in range(steps):
        driver.execute_script(f"window.scrollBy(0,{s});")
        time.sleep(pause)

def do_home_flows(driver, base_url, deadline):
    driver.get(base_url)
    wait_css(driver, "header#siteHeader")                                  # header exists on index
    time.sleep(1.0)

    # 1) Cycle hero and click CTAs to category pages, then back
    for _ in range(2):
        if time.time() > deadline: return
        safe_click(driver, "#nextSlide")
        time.sleep(0.8)

    # click each hero slide CTA if present (beds / toys / collars)
    for href in ["category.html?cat=beds", "category.html?cat=toys", "category.html?cat=collars"]:
        if time.time() > deadline: return
        with suppress(Exception):
            driver.get(base_url)  # return to home first
            time.sleep(0.6)
            link = driver.find_element(By.CSS_SELECTOR, f'a[href="{href}"]')
            driver.execute_script("arguments[0].scrollIntoView({block:'center'});", link)
            link.click()
            do_category_flows(driver, deadline)
            driver.back()
            time.sleep(0.5)

    # 2) Open search dropdown and click each category button (beds/toys/collars/food)
    if time.time() > deadline: return
    safe_click(driver, "#searchBtn")
    for data_cat in ["beds", "toys", "collars", "food"]:
        if time.time() > deadline: return
        if safe_click(driver, f'#searchDropdown button[data-category="{data_cat}"]'):
            time.sleep(0.6)
            do_category_flows(driver, deadline)
            driver.back()
            time.sleep(0.4)

    # 3) Scroll to “Collection” and flip sort/filter selects (id=sortSelect, id=filterSelect)
    if time.time() > deadline: return
    with suppress(Exception):
        driver.get(base_url)
        smooth_scroll(driver, 1400)
        time.sleep(0.3)
        sort = driver.find_element(By.CSS_SELECTOR, "#sortSelect")
        for v in ["price-asc", "price-desc", "name", "featured"]:
            if time.time() > deadline: return
            driver.execute_script("arguments[0].value=arguments[1]; arguments[0].dispatchEvent(new Event('change'));", sort, v)
            time.sleep(0.35)
        with suppress(Exception):
            filt = driver.find_element(By.CSS_SELECTOR, "#filterSelect")
            for v in ["beds", "toys", "collars", "all"]:
                if time.time() > deadline: return
                driver.execute_script("arguments[0].value=arguments[1]; arguments[0].dispatchEvent(new Event('change'));", filt, v)
                time.sleep(0.35)

    # 4) Open/close cart drawer (#cartBtn / #closeCart) on both pages
    if time.time() > deadline: return
    with suppress(Exception):
        safe_click(driver, "#cartBtn")
        time.sleep(0.4)
        safe_click(driver, "#closeCart")
        time.sleep(0.2)

def do_category_flows(driver, deadline):
    # On category.html we have #sortSelect and a grid; cart exists too
    wait_css(driver, "main")
    time.sleep(0.3)
    with suppress(Exception):
        sort = driver.find_element(By.CSS_SELECTOR, "#sortSelect")
        for v in ["price-asc", "price-desc", "name", "featured"]:
            if time.time() > deadline: return
            driver.execute_script("arguments[0].value=arguments[1]; arguments[0].dispatchEvent(new Event('change'));", sort, v)
            time.sleep(0.35)
    smooth_scroll(driver, 1000)
    time.sleep(0.25)
    with suppress(Exception):
        safe_click(driver, "#cartBtn"); time.sleep(0.3); safe_click(driver, "#closeCart")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--firefox-binary", required=True, help="Path to Firefox binary")
    ap.add_argument("--base-url", required=True, help="e.g. http://127.0.0.1/CSE407_Proejct/baseline/")
    ap.add_argument("--duration", type=int, default=180)
    ap.add_argument("--prewait", type=int, default=8, help="seconds you use to start the profiler")
    ap.add_argument("--close-mode", choices=["enter","auto"], default="enter")
    args = ap.parse_args()

    # --- Enforce minimum run time of 180s (3 minutes) ---
    MIN_DURATION = 180
    if args.duration < MIN_DURATION:
        log(f"Requested duration {args.duration}s is less than minimum {MIN_DURATION}s; enforcing minimum.")
        args.duration = MIN_DURATION

    opts = webdriver.FirefoxOptions()
    opts.binary_location = args.firefox_binary
    # Keep UI visible for DevTools recording
    service = FFService()

    driver = webdriver.Firefox(service=service, options=opts)
    driver.set_window_size(1366, 900)

    try:
        log(f"firefox_binary = {args.firefox_binary}")
        log("Window ready. Press F12 → Performance → Start recording in THIS window.")
        time.sleep(max(1,args.prewait))

        time.sleep(1.0)
        log("Navigating in 1s ……"); time.sleep(1.0)

        t_start = datetime.utcnow().isoformat()
        deadline = time.time() + args.duration

        # --- Keep interacting until deadline ---
        while time.time() < deadline:
            do_home_flows(driver, args.base_url, deadline)
            # brief pause to avoid hammering
            time.sleep(0.2)

        # Make sure we stop page activity when time is up
        log("Switching to about:blank to quiesce activity …")
        with suppress(Exception):
            driver.execute_script("window.stop();")
        driver.get("about:blank")
        time.sleep(0.5)

        t_end = datetime.utcnow().isoformat()
        log("")
        log("Done. Stop the profiler, read the tooltips, and write them down.")
        log(f"start={t_start} end={t_end}")
        if args.close_mode == "enter":
            input("\n[browse_variant] Press Enter here AFTER you export JSON / take readings to close the browser…\n")
        else:
            time.sleep(10)
    finally:
        with suppress(Exception): driver.quit()

if __name__ == "__main__":
    sys.exit(main() or 0)
