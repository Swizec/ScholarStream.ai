"use client";

import styles from "@/styles/Home.module.css";
import Script from "next/script";

export const BuyButton = () => {
    return (
        <>
            <a
                href="https://scholarstream.lemonsqueezy.com/checkout/buy/bf4997b5-bfea-44ec-9b77-22889d989ff2?embed=1&media=0"
                onClick={() =>
                    // @ts-ignore
                    window.plausible &&
                    // @ts-ignore
                    window.plausible("Purchase Button Clicked")
                }
                className={`lemonsqueezy-button ${styles.buyButton}`}
            >
                Get a daily email digest for $5/mo
            </a>
            <Script
                src="https://app.lemonsqueezy.com/js/lemon.js"
                strategy="lazyOnload"
                onLoad={() =>
                    // @ts-ignore
                    window.createLemonSqueezy()
                }
            />
        </>
    );
};
