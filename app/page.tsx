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
    const creators = paper.creator
        .replace(/<[^>]*>?/gm, "")
        .split(",")
        .map((s) => s.trim());

    return (
        <div key={summary.id} style={{ marginBottom: "1em" }}>
            {creators.map((name) => (
                // @ts-expect-error Server Component
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

const Avatar = async (props: { name: string }) => {
    let src: string;
    try {
        src = await openai.getAvatar(props.name, "256");
    } catch (e) {
        console.error(e);
        return <></>;
    }

    return (
        <Image
            src={src}
            width={50}
            height={50}
            alt={`AI generated avatar of ${props.name}`}
        />
    );
};

export default async function Home() {
    const feed = await arxiv.getFeed("cs");
    const papers = feed.items.slice(0, 5);
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
