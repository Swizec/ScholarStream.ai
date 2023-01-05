import styles from "@/styles/Home.module.css";
import feedStyles from "@/styles/Feed.module.css";
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
        <div key={summary.id} className={feedStyles.item}>
            {creators.map((name) => (
                <Avatar name={name} key={name} />
            ))}
            <h3
                dangerouslySetInnerHTML={{
                    __html: creators.join(", "),
                }}
            />
            <p>{summary.choices[0].text}</p>
            <div>
                Full paper at 👉{" "}
                <a href={paper.link} className={feedStyles.linkPaper}>
                    {paper.title.split(/(\(|\. \()arXiv/)[0]}
                </a>
            </div>
        </div>
    );
};

const Feed = async (props: { topic: string }) => {
    const feed = await arxiv.getFeed(props.topic);
    const papers = feed.items.slice(0, 10);

    const summaries: [arxiv.ArxivFeedItem, CreateCompletionResponse][] =
        await Promise.all(
            papers.map(async (paper) => [paper, await openai.getSummary(paper)])
        );

    return (
        <div className={feedStyles.feed}>
            <h1>Latest "{props.topic}" papers</h1>
            {summaries.map(([paper, summary]) => (
                <FeedItem paper={paper} summary={summary} key={summary.id} />
            ))}
        </div>
    );
};

const Pitch = () => (
    <div className={styles.pitch}>
        <h1>ScholarStream.ai</h1>
        <p>Welcome to the world of academic insights!</p>
        <p>
            Are you tired of the shallow and attention-seeking content on social
            media? Are you looking for a deeper understanding of the world
            around you? Look no further!
        </p>
        <p>
            ScholarStream.ai brings you the latest research from the world of
            academia, all in a convenient and engaging Twitter-like feed.
        </p>
        <p>
            With ScholarStream.ai, you can dive into the latest findings from
            top researchers and scholars, all at the touch of a button. No more
            sifting through tedious journals or abstracts – our AI does the work
            for you, presenting you with the latest information in an easily
            digestible format.
        </p>
        <p>
            Explore the depths of knowledge today with ScholarStream.ai. Your
            mind will thank you!
        </p>
    </div>
);

export default async function Home() {
    return (
        <main className={styles.main}>
            <Pitch />

            {/* @ts-expect-error Server Component */}
            <Feed topic="econ" />
        </main>
    );
}
