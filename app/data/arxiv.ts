import Parser from "rss-parser";

const TEN_HOURS = 10 * 60 * 60;

type ArxivFeed = {
    publisher: string;
    title: string;
    description: string;
    link: string;
};

export type ArxivFeedItem = {
    title: string;
    link: string;
    creator: string;
    content: string;
    contentSnippet: string;
};

export async function getFeed(
    category: string
): Promise<ArxivFeed & { items: ArxivFeedItem[] }> {
    const parser: Parser<ArxivFeed, ArxivFeedItem> = new Parser();
    const feed = await fetch(`http://arxiv.org/rss/${category}?version=1.0`, {
        next: { revalidate: TEN_HOURS },
    }).then((r) => r.text());

    const parsed = await parser.parseString(feed);

    return parsed;
}
