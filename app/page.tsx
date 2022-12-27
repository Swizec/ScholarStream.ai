import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import * as arxiv from "./data/arxiv";
import * as openai from "./data/openai";
import { CreateCompletionResponse } from "openai";

const FeedItem = (props: {
    paper: arxiv.ArxivFeedItem;
    summary: CreateCompletionResponse;
}) => {
    const { paper, summary } = props;

    return (
        <div key={summary.id} style={{ marginBottom: "1em" }}>
            <h3
                dangerouslySetInnerHTML={{
                    __html: paper.creator.replace(/<[^>]*>?/gm, ""),
                }}
            />
            <p>{summary.choices[0].text}</p>
            <a href={paper.link} style={{ color: "blue" }}>
                {paper.link}
            </a>
        </div>
    );
};

export default async function Home() {
    const feed = await arxiv.getFeed("cs");
    const papers = feed.items.slice(0, 10);
    console.log(feed.items.length);

    const summaries: [arxiv.ArxivFeedItem, CreateCompletionResponse][] =
        await Promise.all(
            papers.map(async (paper) => [paper, await openai.getSummary(paper)])
        );

    return (
        <main className={styles.main}>
            {summaries.map(([paper, summary]) => (
                <FeedItem paper={paper} summary={summary} key={summary.id} />
            ))}
        </main>
    );
}
