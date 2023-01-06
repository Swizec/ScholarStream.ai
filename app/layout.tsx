import "@/styles/globals.css";
import Script from "next/script";

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
            <body>{children}</body>
        </html>
    );
}
