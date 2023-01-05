import Image from "next/image";
import styles from "@/styles/Home.module.css";
import * as arxiv from "./data/arxiv";
import * as openai from "./data/openai";
import { CreateCompletionResponse } from "openai";
import { cache, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

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
                <Suspense
                    fallback={<AvatarPlaceholder name={name} />}
                    key={name}
                >
                    <ErrorBoundary fallback={<AvatarPlaceholder name={name} />}>
                        {/* @ts-expect-error Server Component */}
                        <Avatar name={name} />
                    </ErrorBoundary>
                </Suspense>
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
    let src = await cache(async (name: string) =>
        openai.getAvatar(name, "256")
    )(props.name);

    return (
        <Image
            src={src}
            width={50}
            height={50}
            alt={`AI generated avatar of ${props.name}`}
        />
    );
};

const AvatarPlaceholder = (props: { name: string }) => (
    <Image
        src={"/avatarPlaceholder.png"}
        width={50}
        height={50}
        alt={`Generating avatar for ${props.name}`}
    />
);

export default async function Home() {
    const feed = await arxiv.getFeed("cs");
    const papers = feed.items.slice(0, 1);
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
