import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import * as arxiv from "./data/arxiv";
import * as openai from "./data/openai";

export default async function Home() {
    const feed = await arxiv.getFeed("cs");
    const papers = feed.items.slice(0, 10);

    const summaries = await Promise.all(papers.map(openai.getSummary));

    return (
        <main className={styles.main}>
            {summaries.map((summary) => (
                <div key={summary.id} className={styles.description}>
                    <p>{summary.choices[0].text}</p>
                </div>
            ))}
        </main>
    );
}
