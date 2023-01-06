import Parser from "rss-parser";

const TEN_HOURS = 10 * 60 * 60;

export type ArxivFeed = {
    publisher: string;
    title: string;
    description: string;
    link: string;
    items: ArxivFeedItem[];
};

export type ArxivFeedItem = {
    title: string;
    link: string;
    creator: string;
    content: string;
    contentSnippet: string;
};

export async function getFeed(category: string): Promise<ArxivFeed> {
    const parser: Parser<
        Omit<ArxivFeed, "items">,
        ArxivFeedItem
    > = new Parser();
    const feed = await fetch(
        `http://export.arxiv.org/rss/${category}?version=1.0`,
        {
            next: { revalidate: TEN_HOURS },
        }
    ).then((r) => r.text());

    try {
        const parsed = await parser.parseString(feed);
        return parsed;
    } catch (e) {
        throw new Error("Could not parse feed");
    }
}
