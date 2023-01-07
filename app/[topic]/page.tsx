import { Feed } from "../Feed";

export default async function Category({
    params,
}: {
    params: { topic: string };
}) {
    // @ts-expect-error Server Component
    return <Feed topic={params.topic} isLast />;
}
