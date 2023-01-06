import "@/styles/globals.css";
import Script from "next/script";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Script
                src="https://plausible.io/js/script.js"
                data-domain="scholarstream.ai"
            />
            <body>
                <nav className={styles.topNav}>
                    <Link href="/about">About</Link>
                </nav>
                {children}
                <div className={styles.footer}>
                    built with reckless abandon by{" "}
                    <a href="https://swizec.com">Swizec</a>
                </div>
            </body>
        </html>
    );
}
