import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { TopicsList } from "@/app/TopicsList";

const MiniPitch = () => {
    return (
        <div className={styles.pitch}>
            <h1>
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="ScholarStream.ai logo"
                        width={64}
                        height={64}
                    />
                    ScholarStream.ai
                </Link>
            </h1>
            <p>Welcome to the world of academic insights!</p>
        </div>
    );
};

export default function About() {
    return (
        <>
            <MiniPitch />
            <main className={styles.main}>
                <div className={styles.about}>
                    <p>
                        Thank you for subscribing to ScholarStream.ai's daily
                        email digest!
                    </p>
                    <p>
                        Your support helps us continue to improve and bring
                        valuable academic research to a wider audience.
                    </p>
                    <p>
                        With your subscription, you'll receive a daily email
                        featuring a selection of the most interesting papers
                        from arXiv, along with AI-generated summaries to help
                        you quickly understand the key points. We're committed
                        to helping you find more insightful things to read than
                        social media.
                    </p>
                    <p>
                        If you have any feedback or suggestions for how we can
                        improve,{" "}
                        <a href="mailto:hi@swizec.com">
                            please don't hesitate to reach out
                        </a>
                        .
                    </p>
                    <p>Thank you again for your support, and happy reading!</p>
                </div>
                <h2>Explore topics:</h2>
                <TopicsList />
            </main>
        </>
    );
}
