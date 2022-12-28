import Image from "next/image";
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

const Avatar = async (props: { name: string }) => {
    const src = await openai.getAvatar(props.name, "256");

    return (
        <Image
            src={src}
            width={250}
            height={250}
            alt={`AI generated avatar of ${props.name}`}
        />
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
            <Avatar name="Matej Zečević" />
            {summaries.map(([paper, summary]) => (
                <FeedItem paper={paper} summary={summary} key={summary.id} />
            ))}
        </main>
    );
}
