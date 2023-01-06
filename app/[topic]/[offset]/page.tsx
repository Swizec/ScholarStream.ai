import { Feed, FeedInnards } from "../../Feed";

export default function CategoryPage({
    params,
}: {
    params: { topic: string; offset: number };
}) {
    const offset = Number(params.offset);

    return (
        // @ts-expect-error Server Component
        <FeedInnards topic={params.topic} offset={offset} count={10} isLast />
    );
}
