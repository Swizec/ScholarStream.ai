import feedStyles from "@/styles/Feed.module.css";
import * as arxiv from "./data/arxiv";
import * as openai from "./data/openai";
import { Avatar } from "./Avatar";
import { cache, Suspense } from "react";
import { RingLoader } from "react-spinners";
import { TopicsList } from "./TopicsList";
import Link from "next/link";

const getSummary = cache(async (paper: arxiv.ArxivFeedItem) => {
    const summary = await openai.getSummary(paper);
    return summary;
});

const PaperSummary = async (props: { paper: arxiv.ArxivFeedItem }) => {
    const summary = await getSummary(props.paper);

    return <p>{summary.choices[0].text}</p>;
};

const FeedItem = async (props: { paper: arxiv.ArxivFeedItem }) => {
    const { paper } = props;

    const creators = paper.creator
        .replace(/<[^>]*>?/gm, "")
        .split(",")
        .map((s) => s.trim());

    return (
        <div className={feedStyles.item}>
            {creators.map((name) => (
                <Avatar name={name} key={name} />
            ))}
            <h3
                dangerouslySetInnerHTML={{
                    __html: creators.join(", "),
                }}
            />
            <Suspense fallback={<RingLoader color="blue" loading />}>
                {/* @ts-expect-error Server Component */}
                <PaperSummary paper={paper} />
            </Suspense>
            <div>
                Full paper at 👉{" "}
                <a href={paper.link} className={feedStyles.linkPaper}>
                    {paper.title.split(/(\(|\. \()arXiv/)[0]}
                </a>
            </div>
        </div>
    );
};

export const FeedLoader = () => {
    return (
        <div className={feedStyles.loader}>
            <RingLoader color="blue" loading />
            <p>Loading ...</p>
        </div>
    );
};

type FeedProps = {
    topic: string;
    count?: number;
    offset?: number;
    isLast?: boolean;
};

export const FeedInnards = async (props: FeedProps) => {
    const { offset = 0, count = 10 } = props;

    let feed: arxiv.ArxivFeed;
    let papers: arxiv.ArxivFeedItem[];

    try {
        feed = await arxiv.getFeed(props.topic);
        papers = feed.items.slice(offset, count);
    } catch (e) {
        console.error(e);

        return (
            <>
                <p>Error loading feed. Try one of these topics instead:</p>
                <TopicsList />
            </>
        );
    }

    const canShowMore = props.isLast && feed.items.length > offset + count;

    return (
        <>
            {papers.map((paper) => (
                // @ts-expect-error Server Component
                <FeedItem paper={paper} key={paper.link} />
            ))}
            {canShowMore ? (
                <div className={feedStyles.showMore}>
                    <p>
                        Showing {offset + count} of {feed.items.length}
                    </p>
                    <Link href={`/${props.topic}/${offset + count}`}>
                        Show more
                    </Link>
                </div>
            ) : null}
        </>
    );
};

export const Feed = (props: FeedProps) => {
    return (
        <div className={feedStyles.feed}>
            <h1>Latest {props.topic} papers</h1>

            <Suspense fallback={<FeedLoader />}>
                {/* @ts-expect-error Server Component */}
                <FeedInnards {...props} />
            </Suspense>
        </div>
    );
};
