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

export const Feed = async (props: { topic: string }) => {
    const feed = await arxiv.getFeed(props.topic);
    const papers = feed.items.slice(0, 10);

    const summaries: [arxiv.ArxivFeedItem, CreateCompletionResponse][] =
        await Promise.all(
            papers.map(async (paper) => [paper, await openai.getSummary(paper)])
        );

    return (
        <div className={feedStyles.feed}>
            <h1>Latest {props.topic} papers</h1>
            {summaries.map(([paper, summary]) => (
                <FeedItem paper={paper} summary={summary} key={summary.id} />
            ))}
        </div>
    );
};
