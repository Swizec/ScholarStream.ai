import styles from "@/styles/Home.module.css";
import * as arxiv from "./data/arxiv";
import * as openai from "./data/openai";
import { CreateCompletionResponse } from "openai";
import { Avatar } from "./Avatar";

const FeedItem = (props: {
    paper: arxiv.ArxivFeedItem;
    summary: CreateCompletionResponse;
}) => {
    const { paper, summary } = props;
    const creators = paper.creator
        .replace(/<[^>]*>?/gm, "")
        .split(",")
        .map((s) => s.trim());

    return (
        <div key={summary.id} style={{ marginBottom: "1em" }}>
            {creators.map((name) => (
                <Avatar name={name} key={name} />
            ))}
            <h3
                dangerouslySetInnerHTML={{
                    __html: creators.join(", "),
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
